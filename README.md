# ARTarual

Strona marki ARTarual – ręcznie robiona biżuteria ze srebra. Treść po angielsku.

Statyczny serwis HTML/CSS/JS, bez build stepu. Wystarczy otworzyć `index.html`.

## Struktura

- `index.html` – strona główna
- `kolekcja.html`, `drop.html` (Drop 01), `drop-2.html` (Drop 02) – kolekcje i dropy
- `produkt.html` – karta produktu (dane z `products.js`)
- `customs.html`, `rozmiary.html`, `o-nas.html`, `kontakt.html` – podstrony
- `dostawa-zwroty.html` – dostawa i zwroty (treść regulaminów do uzupełnienia)
- `styles.css`, `script.js` – style i logika
- `products.js` – dane sklepu, konfigurator i koszyk (bez płatności: koszyk zamienia się w jednego maila)
- `zdj/` – zdjęcia oryginalne, `zdj/web/` – wersje przeskalowane pod stronę
- `zdjecia/` – oryginały zdjęć Drop 02, sesji i zdjęcia głównego (po folderze na pierścionek)
- `zdj/sklep/` + `zdjecia.js` – generowane automatycznie z `zdjecia/`, nie edytować ręcznie

## Zdjęcia – dodawanie i kolejność

1. Wrzuć / przenumeruj pliki w `zdjecia/<folder>/` (`01.jpg`, `02.jpg`, … – kolejność nazw = kolejność na stronie).
2. Dwuklik w `przygotuj-zdjecia.bat`.
3. Commit + push.

Szczegóły: `zdjecia/JAK-DODAC-ZDJECIA.txt`.
