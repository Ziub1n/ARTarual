/* =============================================================================
   ARTarual — dane sklepu i konfigurator pierścionka

   ⚠️  WSZYSTKO, CO SIĘ ZMIENIA NA CO DZIEŃ (ceny, kamienie, materiały,
       czas realizacji, zdjęcia), jest w sekcji "DANE" poniżej.
       Reszta pliku to logika — normalnie nie trzeba jej ruszać.

   Ceny są PRZYKŁADOWE — trzeba je podmienić na prawdziwe.
   ============================================================================= */

/* =============================================================================
   DANE — 1. MATERIAŁY
   dop  = dopłata do ceny bazowej (zł, może być ujemna)
   tyg  = ile tygodni dokłada do czasu realizacji
   ============================================================================= */
const MATERIALY = [
  { id: 'srebro925',  nazwa: 'srebro 925',         opis: 'polerowane, klasyczne',          dop: 0,    tyg: 0, kolor: '#D9D9DE' },
  { id: 'oksydowane', nazwa: 'srebro oksydowane',  opis: 'przyciemniane, matowe',          dop: 40,   tyg: 0, kolor: '#66666E' },
  { id: 'zlocone',    nazwa: 'srebro złocone 24k', opis: 'gruba powłoka złota na srebrze', dop: 180,  tyg: 1, kolor: '#E0B143' },
  { id: 'mosiadz',    nazwa: 'mosiądz',            opis: 'ciepły, żółty, ładnie patynuje', dop: -70,  tyg: 0, kolor: '#C0873C' },
  { id: 'zloto585',   nazwa: 'złoto 585',          opis: 'pełne złoto, robione od zera',   dop: 1450, tyg: 3, kolor: '#F0C75E' },
];

/* =============================================================================
   DANE — 2. KAMIENIE
   kolory = warianty kolorystyczne danego kamienia (nazwa + próbka koloru)
   zam    = true → kamień sprowadzany na zamówienie (dokłada tydzień)
   ============================================================================= */
const KAMIENIE = [
  { id: 'brak', nazwa: 'bez kamienia', dop: 0, zam: false, kolory: [] },

  { id: 'ksiezycowy', nazwa: 'kamień księżycowy', dop: 120, zam: false, kolory: [
    { nazwa: 'mleczny biały',     hex: '#EDEAF2' },
    { nazwa: 'błękitna poświata', hex: '#B6C8E8' },
    { nazwa: 'brzoskwiniowy',     hex: '#F0C6A4' },
  ]},
  { id: 'ametyst', nazwa: 'ametyst', dop: 140, zam: false, kolory: [
    { nazwa: 'głęboki fiolet', hex: '#6E3F9E' },
    { nazwa: 'lawendowy',      hex: '#B49BD8' },
    { nazwa: 'dymny',          hex: '#7A6A88' },
  ]},
  { id: 'labradoryt', nazwa: 'labradoryt', dop: 150, zam: false, kolory: [
    { nazwa: 'stalowy z błyskiem', hex: '#59697A' },
    { nazwa: 'zielony połysk',     hex: '#557A66' },
    { nazwa: 'złocisty',           hex: '#8C7A52' },
  ]},
  { id: 'cytryn', nazwa: 'cytryn', dop: 130, zam: false, kolory: [
    { nazwa: 'miodowy',   hex: '#DFA236' },
    { nazwa: 'słomkowy',  hex: '#EFD07A' },
  ]},
  { id: 'granat', nazwa: 'granat', dop: 135, zam: true, kolory: [
    { nazwa: 'ciemna wiśnia', hex: '#76202D' },
    { nazwa: 'ceglasty',      hex: '#B0402F' },
  ]},
  { id: 'turkus', nazwa: 'turkus', dop: 110, zam: false, kolory: [
    { nazwa: 'jasny błękit',  hex: '#5BB8C2' },
    { nazwa: 'zielonkawy',    hex: '#3E9080' },
    { nazwa: 'z matrycą',     hex: '#4E8E92' },
  ]},
  { id: 'onyks', nazwa: 'onyks', dop: 100, zam: false, kolory: [
    { nazwa: 'czarny mat',        hex: '#2C2C31' },
    { nazwa: 'czarny polerowany', hex: '#141416' },
  ]},
  { id: 'perla', nazwa: 'perła słodkowodna', dop: 95, zam: false, kolory: [
    { nazwa: 'kremowa',       hex: '#F2E8DA' },
    { nazwa: 'grafitowa',     hex: '#8A8891' },
    { nazwa: 'różany połysk', hex: '#E8C7CD' },
  ]},
  { id: 'szafir', nazwa: 'szafir', dop: 620, zam: true, kolory: [
    { nazwa: 'chabrowy',  hex: '#2B4C8C' },
    { nazwa: 'stalowy',   hex: '#4A6480' },
  ]},
];

/* =============================================================================
   DANE — 3. ROZMIARY I CENA WZGLĘDEM ROZMIARU
   Rozmiar podajemy w skali PL (obwód palca w mm = rozmiar + 40).
   Im większy pierścionek, tym więcej metalu — stąd dopłata.
   ============================================================================= */
const ROZMIAR_MIN = 8;
const ROZMIAR_MAX = 24;

const PROGI_ROZMIAROW = [
  { od: 8,  do: 11, dop: -25, opis: 'drobne'      },
  { od: 12, do: 15, dop: 0,   opis: 'standardowe' },
  { od: 16, do: 19, dop: 35,  opis: 'większe'     },
  { od: 20, do: 24, dop: 75,  opis: 'najszersze'  },
];

/* =============================================================================
   DANE — 4. PIERŚCIONKI
   cena    = cena bazowa: srebro 925, bez kamienia, rozmiar standardowy (12–15)
   zdjecia = nazwy plików z folderu zdj/web/ (bez -640.jpg / -1280.jpg)
   tygMin / tygMax = bazowy czas realizacji w tygodniach
   domyslny = co ma być wybrane po wejściu na stronę pierścionka
   ============================================================================= */
const PIERSCIONKI = [
  {
    id: 'lawenda', nr: '01', nazwa: 'Lawenda', drop: 1,
    krotki: 'szeroka, ciężka obrączka z jednym kamieniem',
    opis: 'Najszersza rzecz, jaką robię — kuta młotkiem, więc każdy egzemplarz łapie światło trochę inaczej. Siedzi na palcu jak coś, co nosisz od lat, nawet pierwszego dnia.',
    cena: 340, szerokosc: '8 mm', waga: '~9 g', tygMin: 2, tygMax: 3,
    zdjecia: ['IMG_2841', 'IMG_2869', 'IMG_2165'],
    domyslny: { material: 'oksydowane', kamien: 'labradoryt', kolor: 0, rozmiar: 14 },
  },
  {
    id: 'cytrynowa-trawa', nr: '02', nazwa: 'Cytrynowa Trawa', drop: 1,
    krotki: 'wąska obrączka, ręcznie polerowana',
    opis: 'Cienka, gładka, do noszenia po kilka naraz. Robiłam ją jako obrączkę ślubną i została w kolekcji na stałe, bo pasuje właściwie do wszystkiego.',
    cena: 260, szerokosc: '3 mm', waga: '~4 g', tygMin: 2, tygMax: 3,
    zdjecia: ['IMG_2231', 'IMG_2233'],
    domyslny: { material: 'srebro925', kamien: 'cytryn', kolor: 0, rozmiar: 13 },
  },
  {
    id: 'malina', nr: '03', nazwa: 'Malina', drop: 1,
    krotki: 'kamień osadzony w srebrnej koronce',
    opis: 'Koronka lutowana z cienkiego drutu, kamień siedzi w niej wysoko i mocno rzuca się w oczy. Najbardziej „na wyjście" z całej kolekcji — ale i tak noszę ją do sklepu.',
    cena: 395, szerokosc: '5 mm', waga: '~6 g', tygMin: 3, tygMax: 4,
    zdjecia: ['IMG_2845', 'IMG_2858'],
    domyslny: { material: 'srebro925', kamien: 'granat', kolor: 0, rozmiar: 13 },
  },
  {
    id: 'pudrowy-sen', nr: '04', nazwa: 'Pudrowy Sen', drop: 1,
    krotki: 'cienka, robiona do warstwowania',
    opis: 'Najlżejsza rzecz, jaką mam. Zaprojektowana tak, żeby nosić ją po trzy, cztery na jednym palcu i żeby nic się nie zaczepiało.',
    cena: 215, szerokosc: '2 mm', waga: '~3 g', tygMin: 2, tygMax: 2,
    zdjecia: ['IMG_2870', 'IMG_2836'],
    domyslny: { material: 'srebro925', kamien: 'brak', kolor: 0, rozmiar: 13 },
  },
  {
    id: 'zachod-slonca', nr: '05', nazwa: 'Zachód Słońca', drop: 1,
    krotki: 'grawer, złocenie 24k',
    opis: 'Powierzchnia rytowana ręcznie — kreski nigdy nie wychodzą dwa razy tak samo. Złocenie wchodzi w rowki i po kilku miesiącach robi się z tego naprawdę ładna mapa.',
    cena: 310, szerokosc: '6 mm', waga: '~7 g', tygMin: 3, tygMax: 4,
    zdjecia: ['IMG_2850', 'IMG_2849'],
    domyslny: { material: 'zlocone', kamien: 'brak', kolor: 0, rozmiar: 14 },
  },
  {
    id: 'gleboka-noc', nr: '06', nazwa: 'Głęboka Noc', drop: 2,
    krotki: 'mocno przyciemniana, z drobnym kamieniem',
    opis: 'Oksyda wchodzi tu bardzo głęboko, prawie do czerni, a kamień zostaje jedynym jasnym punktem. Z czasem wypukłości się przecierają i wraca z nich srebro.',
    cena: 355, szerokosc: '6 mm', waga: '~7 g', tygMin: 3, tygMax: 4,
    zdjecia: ['IMG_2863', 'IMG_2847'],
    domyslny: { material: 'oksydowane', kamien: 'ksiezycowy', kolor: 1, rozmiar: 14 },
  },
  {
    id: 'poranna-mgla', nr: '07', nazwa: 'Poranna Mgła', drop: 2,
    krotki: 'matowe srebro z fakturą lnu',
    opis: 'Fakturę odbijam z prawdziwego kawałka lnu, więc splot jest nierówny tam, gdzie tkanina była nierówna. Matowa, nie błyszczy się na zdjęciach i o to chodziło.',
    cena: 285, szerokosc: '5 mm', waga: '~6 g', tygMin: 2, tygMax: 3,
    zdjecia: ['IMG_2262', 'IMG_2842'],
    domyslny: { material: 'srebro925', kamien: 'perla', kolor: 0, rozmiar: 13 },
  },
  {
    id: 'limonkowy-chwast', nr: '08', nazwa: 'Limonkowy Chwast', drop: 2,
    krotki: 'nieregularny kształt, jakby wyrósł',
    opis: 'Zaczęła się od wosku, który zgniotłam ze złości, i wyszła z tego moja ulubiona forma. Żaden egzemplarz nie jest taki sam — nie da się tego powtórzyć.',
    cena: 330, szerokosc: '4–9 mm', waga: '~8 g', tygMin: 3, tygMax: 4,
    zdjecia: ['IMG_2866', 'IMG_2861'],
    domyslny: { material: 'srebro925', kamien: 'turkus', kolor: 0, rozmiar: 14 },
  },
  {
    id: 'wieczorny-amarant', nr: '09', nazwa: 'Wieczorny Amarant', drop: 2,
    krotki: 'rzeźbiona, z inicjałem na zamówienie',
    opis: 'Sygnet z płaską główką, na której mogę wyryć inicjał, datę albo cokolwiek, co da się zmieścić na dziesięciu milimetrach. Napisz w zamówieniu, co ma tam być.',
    cena: 420, szerokosc: '10 mm główka', waga: '~11 g', tygMin: 3, tygMax: 5,
    zdjecia: ['IMG_2862', 'IMG_2843'],
    domyslny: { material: 'srebro925', kamien: 'onyks', kolor: 0, rozmiar: 15 },
  },
];

/* =============================================================================
   DANE — 5. DROPY (kolekcje w menu "sklep")
   ============================================================================= */
const DROPY = {
  1: { nazwa: 'drop 1', podtytul: 'lato / codzienne', opis: 'Pięć rzeczy, które robię najczęściej i które najczęściej wracają do mnie na zdjęciach od Was. Wszystkie do zrobienia w Twoim rozmiarze i materiale.' },
  2: { nazwa: 'drop 2', podtytul: 'jesień / cięższe formy', opis: 'Nowsza, trochę mroczniejsza czwórka — więcej oksydy, więcej faktury i pierwszy sygnet z grawerem.' },
};

/* =============================================================================
   MAIL, POD KTÓRY IDĄ ZAMÓWIENIA
   ============================================================================= */
const MAIL_ZAMOWIENIA = 'hej@artarual.pl';


/* =============================================================================
   =============  LOGIKA — poniżej normalnie nie trzeba nic zmieniać  ==========
   ============================================================================= */

const ZDJ = 'zdj/web/';

function fotoSrc(nazwa, w) { return `${ZDJ}${nazwa}-${w}.jpg`; }

/** <img> z srcset — przeglądarka sama dobiera 400 / 640 / 1280 px. */
function fotoTag(nazwa, alt, sizes, klasa) {
  return `<img src="${fotoSrc(nazwa, 640)}"
    srcset="${fotoSrc(nazwa, 400)} 400w, ${fotoSrc(nazwa, 640)} 640w, ${fotoSrc(nazwa, 1280)} 1280w"
    sizes="${sizes}" alt="${alt}" loading="lazy" decoding="async"${klasa ? ` class="${klasa}"` : ''}>`;
}

function zl(n) { return `${Math.round(n).toLocaleString('pl-PL')} zł`; }

function tygodnie(n) {
  if (n === 1) return 'tydzień';
  const j = n % 10, d = n % 100;
  if (j >= 2 && j <= 4 && !(d >= 12 && d <= 14)) return 'tygodnie';
  return 'tygodni';
}

function zakresTygodni(min, max) {
  return min === max ? `${min} ${tygodnie(min)}` : `${min}–${max} ${tygodnie(max)}`;
}

const znajdzMaterial = id => MATERIALY.find(m => m.id === id) || MATERIALY[0];
const znajdzKamien  = id => KAMIENIE.find(k => k.id === id)  || KAMIENIE[0];
const znajdzPierscionek = id => PIERSCIONKI.find(p => p.id === id);

function progRozmiaru(rozmiar) {
  return PROGI_ROZMIAROW.find(p => rozmiar >= p.od && rozmiar <= p.do) || PROGI_ROZMIAROW[1];
}

/** Pełna cena dla konkretnej konfiguracji. */
function policzCene(p, materialId, kamienId, rozmiar) {
  return p.cena
    + znajdzMaterial(materialId).dop
    + znajdzKamien(kamienId).dop
    + progRozmiaru(rozmiar).dop;
}

/** Najniższa możliwa cena — do etykiety „od …” na listingu. */
function cenaOd(p) {
  const najtanszyMaterial = Math.min(...MATERIALY.map(m => m.dop));
  const najtanszyProg = Math.min(...PROGI_ROZMIAROW.map(s => s.dop));
  return p.cena + najtanszyMaterial + najtanszyProg;
}

/** Czas realizacji dla konfiguracji, jako gotowy tekst. */
function policzCzas(p, materialId, kamienId) {
  const m = znajdzMaterial(materialId);
  const k = znajdzKamien(kamienId);
  let min = p.tygMin + m.tyg;
  let max = p.tygMax + m.tyg;
  if (k.zam) { min += 1; max += 2; }
  return zakresTygodni(min, max);
}


/* -----------------------------------------------------------------------------
   Listing pierścionków (strona główna, dropy)
   ----------------------------------------------------------------------------- */
/** Podpis pod nazwą: materiał domyślny + kamień — jak "925 Sterling Silver / Swarovski". */
function podpisMaterialu(p) {
  const m = znajdzMaterial(p.domyslny.material);
  const k = znajdzKamien(p.domyslny.kamien);
  return k.id === 'brak' ? m.nazwa : `${m.nazwa} / ${k.nazwa}`;
}

function kafelek(p) {
  const alt = `${p.nazwa} — ${p.krotki}`;
  const sizes = '(max-width:720px) 46vw, (max-width:1024px) 30vw, 23vw';
  const drugie = p.zdjecia[1];
  return `
    <article class="piece" data-category="drop-${p.drop}">
      <a href="produkt.html?id=${p.id}" aria-label="${p.nazwa} — zobacz i skonfiguruj">
        <div class="piece__frame">
          ${fotoTag(p.zdjecia[0], alt, sizes)}
          ${drugie ? fotoTag(drugie, '', sizes, 'piece__img--alt') : ''}
        </div>
        <div class="piece__meta">
          <span class="piece__name">${p.nazwa}</span>
          <span class="piece__price">od ${zl(cenaOd(p))}</span>
        </div>
        <p class="piece__desc">${podpisMaterialu(p)}</p>
      </a>
    </article>`;
}

/** Filtry nad siatką (kolekcja.html). Podpinane po renderze, bo kafelki
    powstają dopiero tutaj — script.js odpaliłby się na pustej liście. */
function wireFiltry() {
  const btns = document.querySelectorAll('.filter-btn');
  if (!btns.length) return;
  btns.forEach(btn => btn.addEventListener('click', () => {
    btns.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
    btn.classList.add('active');
    btn.setAttribute('aria-pressed', 'true');
    const cat = btn.dataset.filter;
    document.querySelectorAll('.gallery [data-category]').forEach(card => {
      card.style.display = (cat === 'all' || card.dataset.category === cat) ? '' : 'none';
    });
  }));
}

/** Wypełnia każdy [data-lista] pierścionkami: "all" | "drop:1" | "n:6" */
function renderListy() {
  document.querySelectorAll('[data-lista]').forEach(el => {
    const filtr = el.dataset.lista;
    let lista = PIERSCIONKI;
    if (filtr.startsWith('drop:')) {
      lista = PIERSCIONKI.filter(p => String(p.drop) === filtr.slice(5));
    } else if (filtr.startsWith('n:')) {
      lista = PIERSCIONKI.slice(0, Number(filtr.slice(2)));
    }
    el.innerHTML = lista.map(kafelek).join('');
  });
  wireFiltry();
}


/* -----------------------------------------------------------------------------
   Strona pierścionka — konfigurator
   ----------------------------------------------------------------------------- */
function renderProdukt() {
  const root = document.querySelector('#produkt');
  if (!root) return;

  const id = new URLSearchParams(location.search).get('id');
  const p = znajdzPierscionek(id) || PIERSCIONKI[0];

  document.title = `${p.nazwa} — ARTarual`;

  // stan konfiguratora
  const d = p.domyslny || {};
  const stan = {
    material: znajdzMaterial(d.material).id,
    kamien:   znajdzKamien(d.kamien).id,
    kolor:    d.kolor || 0,
    rozmiar:  d.rozmiar || 13,
    foto:     0,
  };

  root.innerHTML = `
    <div class="product">
      <div class="pgal">
        <div class="pgal__main" id="pgal-main"></div>
        ${p.zdjecia.length > 1 ? '<div class="pgal__thumbs" id="pgal-thumbs" role="tablist" aria-label="Zdjęcia pierścionka"></div>' : ''}
      </div>

      <div class="product__cfg">
        <div class="product__head">
          <span class="product__no">№ ${p.nr} · ${DROPY[p.drop] ? DROPY[p.drop].nazwa : ''}</span>
          <h1>${p.nazwa}</h1>
          <p class="product__lede">${p.opis}</p>
          <div class="product-facts">
            <div><strong>szerokość</strong>${p.szerokosc}</div>
            <div><strong>waga</strong>${p.waga}</div>
            <div><strong>robione</strong>ręcznie, w Warszawie</div>
          </div>
        </div>

        <div class="opt">
          <div class="opt__head"><h3>materiał</h3><span class="opt__pick" id="pick-material"></span></div>
          <div class="chips" id="chips-material"></div>
        </div>

        <div class="opt">
          <div class="opt__head"><h3>kamień</h3><span class="opt__pick" id="pick-kamien"></span></div>
          <div class="chips" id="chips-kamien"></div>
        </div>

        <div class="opt" id="opt-kolor">
          <div class="opt__head"><h3>kolor kamienia</h3><span class="opt__pick" id="pick-kolor"></span></div>
          <div class="chips" id="chips-kolor"></div>
        </div>

        <div class="opt">
          <div class="opt__head"><h3>rozmiar</h3><span class="opt__pick" id="pick-rozmiar"></span></div>
          <div class="sizes" id="sizes"></div>
          <p class="size-help">Nie znasz swojego rozmiaru? <a href="rozmiary.html" class="text-link">zmierz go w 2 minuty →</a></p>
        </div>

        <div class="summary">
          <div class="summary__price">
            <span class="val" id="cena">—</span>
            <span class="from">za sztukę</span>
          </div>
          <ul class="summary__rows" id="rozpiska"></ul>
          <span class="lead-badge">⏳ czas realizacji: <span id="czas">—</span></span>
          <div class="btn-row">
            <a href="#" class="btn btn-primary" id="zamow">zamów mailem →</a>
            <button type="button" class="btn btn-ghost" id="kopiuj">skopiuj konfigurację</button>
            <span class="copied" id="skopiowano">skopiowane!</span>
          </div>
          <p class="summary__note">Nie ma tu koszyka — zamówienie potwierdzam osobiście mailem, żebyśmy zdążyły dogadać rozmiar i detale, zanim cokolwiek zacznę robić.</p>
        </div>
      </div>
    </div>`;

  /* --- zdjęcia --- */
  const elMain = root.querySelector('#pgal-main');
  const elThumbs = root.querySelector('#pgal-thumbs');

  function rysujZdjecia() {
    elMain.innerHTML = fotoTag(p.zdjecia[stan.foto], `${p.nazwa} — zdjęcie ${stan.foto + 1}`, '(max-width:1080px) 92vw, 46vw');
    if (!elThumbs) return;
    elThumbs.innerHTML = p.zdjecia.map((z, i) => `
      <button type="button" role="tab" aria-selected="${i === stan.foto}" aria-label="Zdjęcie ${i + 1}">
        <img src="${fotoSrc(z, 400)}" alt="" loading="lazy">
      </button>`).join('');
    elThumbs.querySelectorAll('button').forEach((b, i) => {
      b.addEventListener('click', () => { stan.foto = i; rysujZdjecia(); });
    });
  }

  elMain.addEventListener('click', () => otworzLightbox(fotoSrc(p.zdjecia[stan.foto], 1280), p.nazwa));

  /* --- opcje --- */
  const elMat = root.querySelector('#chips-material');
  const elKam = root.querySelector('#chips-kamien');
  const elKol = root.querySelector('#chips-kolor');
  const elOptKol = root.querySelector('#opt-kolor');
  const elSizes = root.querySelector('#sizes');

  function rysujMaterialy() {
    elMat.innerHTML = MATERIALY.map(m => `
      <button type="button" class="chip" data-id="${m.id}" aria-pressed="${m.id === stan.material}" title="${m.opis}">
        <span class="dot" style="background:${m.kolor}"></span>${m.nazwa}
        ${m.dop ? `<span class="delta">${m.dop > 0 ? '+' : '−'}${zl(Math.abs(m.dop))}</span>` : ''}
      </button>`).join('');
    elMat.querySelectorAll('.chip').forEach(b => b.addEventListener('click', () => {
      stan.material = b.dataset.id; przelicz();
    }));
  }

  function rysujKamienie() {
    elKam.innerHTML = KAMIENIE.map(k => `
      <button type="button" class="chip" data-id="${k.id}" aria-pressed="${k.id === stan.kamien}">
        ${k.kolory.length ? `<span class="dot" style="background:${k.kolory[0].hex}"></span>` : ''}${k.nazwa}
        ${k.dop ? `<span class="delta">+${zl(k.dop)}</span>` : ''}
      </button>`).join('');
    elKam.querySelectorAll('.chip').forEach(b => b.addEventListener('click', () => {
      if (stan.kamien !== b.dataset.id) stan.kolor = 0;
      stan.kamien = b.dataset.id; przelicz();
    }));
  }

  function rysujKolory() {
    const k = znajdzKamien(stan.kamien);
    if (!k.kolory.length) { elOptKol.style.display = 'none'; return; }
    elOptKol.style.display = '';
    if (stan.kolor >= k.kolory.length) stan.kolor = 0;
    elKol.innerHTML = k.kolory.map((c, i) => `
      <button type="button" class="chip" data-i="${i}" aria-pressed="${i === stan.kolor}">
        <span class="dot" style="background:${c.hex}"></span>${c.nazwa}
      </button>`).join('');
    elKol.querySelectorAll('.chip').forEach(b => b.addEventListener('click', () => {
      stan.kolor = Number(b.dataset.i); przelicz();
    }));
  }

  function rysujRozmiary() {
    let html = '';
    for (let r = ROZMIAR_MIN; r <= ROZMIAR_MAX; r++) {
      const dop = progRozmiaru(r).dop;
      html += `
        <button type="button" class="size-btn" data-r="${r}" aria-pressed="${r === stan.rozmiar}">
          <span class="n">${r}</span>
          <span class="mm">${r + 40} mm</span>
          <span class="d">${dop ? (dop > 0 ? '+' : '−') + Math.abs(dop) + ' zł' : ''}</span>
        </button>`;
    }
    elSizes.innerHTML = html;
    elSizes.querySelectorAll('.size-btn').forEach(b => b.addEventListener('click', () => {
      stan.rozmiar = Number(b.dataset.r); przelicz();
    }));
  }

  /* --- podsumowanie --- */
  function opisKonfiguracji() {
    const m = znajdzMaterial(stan.material);
    const k = znajdzKamien(stan.kamien);
    const kolor = k.kolory.length ? k.kolory[stan.kolor] : null;
    return {
      m, k, kolor,
      cena: policzCene(p, stan.material, stan.kamien, stan.rozmiar),
      czas: policzCzas(p, stan.material, stan.kamien),
      kamienTekst: k.id === 'brak' ? 'bez kamienia' : `${k.nazwa}${kolor ? ` (${kolor.nazwa})` : ''}`,
    };
  }

  function przelicz() {
    rysujMaterialy(); rysujKamienie(); rysujKolory(); rysujRozmiary(); rysujZdjecia();

    const c = opisKonfiguracji();

    root.querySelector('#pick-material').textContent = c.m.nazwa;
    root.querySelector('#pick-kamien').textContent = c.k.nazwa;
    const pickKolor = root.querySelector('#pick-kolor');
    if (pickKolor) pickKolor.textContent = c.kolor ? c.kolor.nazwa : '';
    root.querySelector('#pick-rozmiar').textContent = `${stan.rozmiar} · obwód ${stan.rozmiar + 40} mm`;

    root.querySelector('#cena').textContent = zl(c.cena);
    root.querySelector('#czas').textContent = c.czas;

    root.querySelector('#rozpiska').innerHTML = `
      <li><span class="k">materiał</span><span class="v">${c.m.nazwa}</span></li>
      <li><span class="k">kamień</span><span class="v">${c.kamienTekst}</span></li>
      <li><span class="k">rozmiar</span><span class="v">${stan.rozmiar} (${stan.rozmiar + 40} mm) · ${progRozmiaru(stan.rozmiar).opis}</span></li>
      <li><span class="k">szerokość</span><span class="v">${p.szerokosc}</span></li>`;

    const tresc =
`Cześć Lauro!

Chciał(a)bym zamówić:

  pierścionek:  ${p.nazwa} (№ ${p.nr})
  materiał:     ${c.m.nazwa}
  kamień:       ${c.kamienTekst}
  rozmiar:      ${stan.rozmiar} (obwód ${stan.rozmiar + 40} mm)

  cena:         ${zl(c.cena)}
  czas realiz.: ${c.czas}

Moje dane / uwagi:
`;
    root.querySelector('#zamow').href =
      `mailto:${MAIL_ZAMOWIENIA}?subject=${encodeURIComponent(`Zamówienie: ${p.nazwa} (№ ${p.nr})`)}&body=${encodeURIComponent(tresc)}`;
    root.querySelector('#kopiuj').dataset.tresc = tresc;
  }

  root.querySelector('#kopiuj').addEventListener('click', e => {
    const txt = e.currentTarget.dataset.tresc || '';
    const ok = root.querySelector('#skopiowano');
    navigator.clipboard?.writeText(txt).then(() => {
      ok.classList.add('show');
      setTimeout(() => ok.classList.remove('show'), 1800);
    }).catch(() => {});
  });

  przelicz();
  renderPodobne(p);
}

/** „Zobacz też" — trzy inne pierścionki pod konfiguratorem. */
function renderPodobne(p) {
  const el = document.querySelector('#podobne');
  if (!el) return;
  const inne = PIERSCIONKI.filter(x => x.id !== p.id).slice(0, 3);
  el.innerHTML = inne.map(kafelek).join('');
}


/* -----------------------------------------------------------------------------
   Lightbox (zdjęcia na pełny ekran)
   ----------------------------------------------------------------------------- */
function otworzLightbox(src, alt) {
  let lb = document.querySelector('.lightbox');
  if (!lb) {
    lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.innerHTML = `<button class="lightbox__close" aria-label="Zamknij">✕</button><img alt="">`;
    document.body.appendChild(lb);
    lb.addEventListener('click', e => {
      if (e.target === lb || e.target.closest('.lightbox__close')) lb.classList.remove('open');
    });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') lb.classList.remove('open'); });
  }
  const img = lb.querySelector('img');
  img.src = src;
  img.alt = alt || '';
  lb.classList.add('open');
}


document.addEventListener('DOMContentLoaded', () => {
  renderListy();
  renderProdukt();

  // zdjęcia oznaczone [data-zoom] też otwierają się na pełny ekran
  document.querySelectorAll('[data-zoom]').forEach(el => {
    el.style.cursor = 'zoom-in';
    el.addEventListener('click', () => otworzLightbox(el.dataset.zoom, el.querySelector('img')?.alt));
  });
});
