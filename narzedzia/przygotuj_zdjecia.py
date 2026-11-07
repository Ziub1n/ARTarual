"""
ARTarual – przygotowanie zdjęć pod stronę.

Czyta folder  zdjecia/  (oryginały, po jednym podfolderze na pierścionek,
plus  sesja/  i  glowne/ ) i dla każdego zdjęcia robi przeskalowane wersje
w  zdj/sklep/  (400 / 640 / 1280 px szerokości, glowne też 1920 px).
Na koniec zapisuje  zdjecia.js  – listę zdjęć w kolejności, którą czyta strona.

KOLEJNOŚĆ = kolejność nazw plików w folderze (01.jpg, 02.jpg, 03.jpg …).
Pierwsze zdjęcie to zdjęcie główne pierścionka, drugie pokazuje się po
najechaniu myszką na kafelek.

Uruchamianie: dwuklik w  przygotuj-zdjecia.bat  w głównym folderze projektu
(albo: python narzedzia/przygotuj_zdjecia.py).
"""
import json
import os
import re
import shutil
import sys

# konsola Windows domyślnie nie lubi polskich znaków
try:
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
except Exception:
    pass

try:
    from PIL import Image, ImageFilter, ImageOps
except ImportError:
    sys.exit("Brakuje biblioteki Pillow. Zainstaluj ją komendą:  python -m pip install Pillow")

try:
    import numpy as np
except ImportError:
    sys.exit("Brakuje biblioteki numpy. Zainstaluj ją komendą:  python -m pip install numpy")

try:  # zdjęcia .heic prosto z iPhone'a – działa tylko, jeśli jest pillow-heif
    from pillow_heif import register_heif_opener
    register_heif_opener()
except ImportError:
    pass

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "zdjecia")
OUT = os.path.join(ROOT, "zdj", "sklep")
MANIFEST = os.path.join(ROOT, "zdjecia.js")

WIDTHS = [400, 640, 1280]
EXTRA_WIDTHS = {"glowne": [1920]}  # zdjęcie na całą szerokość ekranu
EXTS = (".jpg", ".jpeg", ".png", ".webp", ".heic", ".heif")


def natural_key(name):
    """'2.jpg' przed '10.jpg' – sortowanie jak w Eksploratorze Windows."""
    return [int(p) if p.isdigit() else p.lower() for p in re.split(r"(\d+)", name)]


# Foldery, które NIE są zdjęciami produktów — zostają w oryginalnym kadrze.
NIE_KADRUJ = {"sesja", "glowne"}
KADR = 4 / 5          # proporcje kafelka / zdjęcia produktu (szer. / wys.)
MIN_SZER = 800        # nie przycinamy węższej niż tyle – żeby nie tracić ostrości
WYPELNIENIE = 0.52    # ile szerokości kadru (mniej więcej) ma zajmować pierścionek


def wykryj_obiekt(im):
    """Prostokąt, w którym jest pierścionek (na jasnym tle), albo None,
    gdy to zdjęcie „z ręki” / bez jednolitego tła — wtedy kadr zostaje środkowy."""
    small = im.copy()
    small.thumbnail((400, 400))
    a = np.asarray(small).astype(np.int16)
    h, w, _ = a.shape
    brzeg = np.concatenate([a[0], a[-1], a[:, 0], a[:, -1]])
    tlo = np.median(brzeg, axis=0)
    # tło musi być jasne i dość jednolite, inaczej to nie packshot
    if tlo.mean() < 170 or np.abs(brzeg - tlo).sum(axis=1).mean() > 45:
        return None
    # Cień NIE jest częścią pierścionka (inaczej np. ametyst z dużym cieniem
    # po lewej lądował z prawej strony kadru). Cień ma miękkie, rozmyte
    # krawędzie, a srebro i kamienie – ostre detale i odblaski, więc
    # pierścionek wykrywamy po ostrych krawędziach + po kolorze.
    szary = np.asarray(small.convert("L").filter(ImageFilter.GaussianBlur(1))).astype(np.float32)
    gx = np.abs(np.diff(szary, axis=1, append=szary[:, -1:]))
    gy = np.abs(np.diff(szary, axis=0, append=szary[-1:, :]))
    krawedzie = (gx + gy) > 14
    nasycenie = a.max(axis=2) - a.min(axis=2)
    maska = krawedzie | (nasycenie > 45)
    # krawędzie odstające od reszty (pyłek, rysa na tle) nie przesuwają kadru
    ys, xs = np.nonzero(maska)
    if len(xs) < 50:
        return None
    # odrzucamy pojedyncze rozrzucone piksele (kurz, szum) — bierzemy 1–99 percentyl
    x0, x1 = np.percentile(xs, [1, 99])
    y0, y1 = np.percentile(ys, [1, 99])
    if (x1 - x0) * (y1 - y0) > 0.7 * w * h:  # obiekt na całe zdjęcie → nie packshot
        return None
    s = im.width / w
    return x0 * s, y0 * s, (x1 + 1) * s, (y1 + 1) * s


def dociagnij_tlo(im, pad_l, pad_t, pad_r, pad_b, przejscie=60):
    """Poszerza zdjęcie o gładkie tło w kolorze krawędzi. Pas przy krawędzi
    oryginału płynnie przechodzi w ten kolor, więc nie widać ani szwu,
    ani smug (powielanie pikseli krawędzi dawało pionowe/poziome paski)."""
    a = np.asarray(im).astype(np.float32)
    H, W, _ = a.shape
    kolor = {}
    pas = 12
    kolor["l"] = np.median(a[:, :pas].reshape(-1, 3), axis=0)
    kolor["r"] = np.median(a[:, -pas:].reshape(-1, 3), axis=0)
    kolor["t"] = np.median(a[:pas].reshape(-1, 3), axis=0)
    kolor["b"] = np.median(a[-pas:].reshape(-1, 3), axis=0)
    # wtapianie krawędzi oryginału w kolor tła (tylko po stronach, gdzie dokładamy)
    for strona, ile in (("l", pad_l), ("r", pad_r), ("t", pad_t), ("b", pad_b)):
        if not ile:
            continue
        n = min(przejscie, (W if strona in "lr" else H) // 4)
        waga = np.linspace(1, 0, n, dtype=np.float32) ** 2  # 1 przy krawędzi → 0 w głąb
        if strona == "l":
            a[:, :n] = a[:, :n] * (1 - waga[None, :, None]) + kolor["l"] * waga[None, :, None]
        elif strona == "r":
            a[:, W - n:] = a[:, W - n:] * (1 - waga[::-1][None, :, None]) + kolor["r"] * waga[::-1][None, :, None]
        elif strona == "t":
            a[:n] = a[:n] * (1 - waga[:, None, None]) + kolor["t"] * waga[:, None, None]
        else:
            a[H - n:] = a[H - n:] * (1 - waga[::-1][:, None, None]) + kolor["b"] * waga[::-1][:, None, None]
    tlo = np.median(np.stack([kolor[k] for k in "lrtb"]), axis=0)
    out = np.empty((H + pad_t + pad_b, W + pad_l + pad_r, 3), np.float32)
    out[:] = tlo
    # każda dokładana strona w swoim kolorze krawędzi
    if pad_l: out[:, :pad_l] = kolor["l"]
    if pad_r: out[:, pad_l + W:] = kolor["r"]
    if pad_t: out[:pad_t] = kolor["t"]
    if pad_b: out[pad_t + H:] = kolor["b"]
    out[pad_t:pad_t + H, pad_l:pad_l + W] = a
    return Image.fromarray(np.clip(out, 0, 255).astype(np.uint8))


def kadruj_produkt(im):
    """Kadr 4:5 z pierścionkiem na środku i w podobnej wielkości na każdym
    zdjęciu. Jeśli kadr wychodzi poza zdjęcie, tło jest dociągane z krawędzi."""
    box = wykryj_obiekt(im)
    W, H = im.size
    if box is None:
        cx, cy = W / 2, H / 2
        cw = min(W, H * KADR)
    else:
        x0, y0, x1, y1 = box
        cx, cy = (x0 + x1) / 2, (y0 + y1) / 2
        potrzeba = max(x1 - x0, (y1 - y0) * KADR) / WYPELNIENIE
        cw = max(min(W, potrzeba), min(MIN_SZER, W))
    ch = cw / KADR
    left, top = round(cx - cw / 2), round(cy - ch / 2)
    cw, ch = round(cw), round(ch)
    # dociągnięcie tła z krawędzi, jeśli kadr wychodzi poza zdjęcie
    pad_l, pad_t = max(0, -left), max(0, -top)
    pad_r, pad_b = max(0, left + cw - W), max(0, top + ch - H)
    if pad_l or pad_t or pad_r or pad_b:
        im = dociagnij_tlo(im, pad_l, pad_t, pad_r, pad_b)
        left += pad_l
        top += pad_t
    return im.crop((left, top, left + cw, top + ch))


def save_resized(im, width, path):
    if im.width > width:
        h = round(im.height * width / im.width)
        im = im.resize((width, h), Image.LANCZOS)
    im.save(path, "JPEG", quality=84, optimize=True, progressive=True)


def main():
    if not os.path.isdir(SRC):
        sys.exit(f"Nie ma folderu {SRC}")

    # zawsze od zera – dzięki temu po zmianie kolejności czy usunięciu
    # zdjęcia nie zostają stare pliki
    shutil.rmtree(OUT, ignore_errors=True)
    os.makedirs(OUT)

    manifest = {}
    for folder in sorted(os.listdir(SRC), key=natural_key):
        fdir = os.path.join(SRC, folder)
        if not os.path.isdir(fdir):
            continue
        files = sorted((f for f in os.listdir(fdir) if f.lower().endswith(EXTS)), key=natural_key)
        names = []
        for i, f in enumerate(files, 1):
            try:
                im = ImageOps.exif_transpose(Image.open(os.path.join(fdir, f))).convert("RGB")
            except Exception as e:  # uszkodzony / nieobsługiwany plik – pomiń, nie przerywaj
                print(f"  ! pomijam {folder}/{f}: {e}")
                continue
            if folder not in NIE_KADRUJ:
                im = kadruj_produkt(im)
            base = f"{folder}-{i:02d}"
            for w in WIDTHS + EXTRA_WIDTHS.get(folder, []):
                save_resized(im, w, os.path.join(OUT, f"{base}-{w}.jpg"))
            names.append(f"zdj/sklep/{base}")
            print(f"  {folder}/{f}  ->  {base}")
        manifest[folder] = names

    with open(MANIFEST, "w", encoding="utf-8") as fh:
        fh.write("/* PLIK GENEROWANY AUTOMATYCZNIE przez narzedzia/przygotuj_zdjecia.py\n"
                 "   – nie edytuj ręcznie. Zmień zdjęcia w folderze zdjecia/ i uruchom\n"
                 "   przygotuj-zdjecia.bat jeszcze raz. */\n")
        fh.write("const ZDJECIA = " + json.dumps(manifest, indent=2, ensure_ascii=False) + ";\n")

    total = sum(len(v) for v in manifest.values())
    print(f"\nGotowe: {total} zdjęć w {len(manifest)} folderach. Zapisano zdjecia.js")


if __name__ == "__main__":
    main()
