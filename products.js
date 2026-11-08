/* =============================================================================
   ARTarual – shop data, ring configurator and bag

   ⚠️  EVERYTHING THAT CHANGES DAY TO DAY (prices, stones, materials,
       lead times, photos) lives in the "DATA" section below.
       The rest of the file is logic – normally you don't need to touch it.

   Prices are real, from Laura. Lead times are still placeholders – swap
   them for the real ones once she confirms.
   ============================================================================= */

/* =============================================================================
   DATA – 1. MATERIALS
   Only two options for this collection: silver at a fixed price, or gold
   quoted individually (quote: true → no surcharge is added automatically,
   the UI shows "quoted individually" instead of a number).
   add  = surcharge on the base price (zł, can be negative)
   wks  = how many weeks it adds to the lead time
   ============================================================================= */
const MATERIALS = [
  { id: 'silver930', name: 'sterling silver 930', namePl: 'srebro 930',     note: 'standard for this collection', notePl: 'standard dla tej kolekcji', add: 0, wks: 0, colour: '#D9D9DE' },
  { id: 'gold',       name: '14k gold',           namePl: 'złoto 14k',     note: 'quoted individually – message me before ordering', notePl: 'wycena indywidualna – napisz przed zamówieniem', add: 0, wks: 2, colour: '#F0C75E', quote: true },
];

/* =============================================================================
   DATA – 2. STONES
   Every ring comes with a cubic zirconia – it is not an optional extra, so
   there is no "no stone" entry and no surcharge for it (add: 0). The colour
   list below is Laura's full standard palette, available on every piece;
   special/pastel shades outside this list are a custom request (see
   cfg.colournote in i18n.js).
   colours = colour variants (name + swatch)
   ============================================================================= */
const STONES = [
  { id: 'cyrkonia', name: 'cubic zirconia', namePl: 'cyrkonia', add: 0, order: false, colours: [
    { name: 'clear',    namePl: 'przezroczysta', hex: '#F0F1EE' },
    { name: 'yellow',   namePl: 'żółta',         hex: '#E8C13A' },
    { name: 'green',    namePl: 'zielona',       hex: '#4C8C5A' },
    { name: 'pink',     namePl: 'różowa',        hex: '#E0669C' },
    { name: 'purple',   namePl: 'fioletowa',     hex: '#7C4FA0' },
    { name: 'sky blue', namePl: 'błękitna',      hex: '#6FB8DA' },
    { name: 'navy',     namePl: 'granatowa',     hex: '#1F3A6B' },
    { name: 'orange',   namePl: 'pomarańczowa',  hex: '#E07B2C' },
    { name: 'red',      namePl: 'czerwona',      hex: '#C42B2B' },
    { name: 'black',    namePl: 'czarna',        hex: '#1B1B1E' },
    { name: 'brown',    namePl: 'brązowa',       hex: '#6B4226' },
  ]},
];

/* =============================================================================
   DATA – 2b. STONE SHAPES (cut of the zircon – separate from its colour)
   ============================================================================= */
const STONE_SHAPES = [
  { id: 'circle',    name: 'circle',    namePl: 'okrąg' },
  { id: 'square',    name: 'square',    namePl: 'kwadrat' },
  { id: 'rectangle', name: 'rectangle', namePl: 'prostokąt' },
  { id: 'teardrop',  name: 'teardrop',  namePl: 'łezka' },
  { id: 'heart',     name: 'heart',     namePl: 'serce' },
];

/* =============================================================================
   DATA – 3. SIZES
   Size is given on the PL scale (inner circumference in mm = size + 40).
   No automatic size surcharge any more – the price is the same across the
   whole range. Very small/large sizes that genuinely need more work or
   material are quoted individually instead (see produkt.faq2 / rozmiary.
   table.note in i18n.js), so SIZE_BANDS no longer carries a price (add:0
   everywhere) – it only keeps the descriptive petite/standard/larger/
   widest label for the size table and the ring-page breakdown.
   ============================================================================= */
const SIZE_MIN = 8;
const SIZE_MAX = 24;

/* note holds an i18n key (same wording as the size table on rozmiary.html)
   rather than raw text, so both live in one place – see bandLabel() below. */
const SIZE_BANDS = [
  { from: 8,  to: 11, add: 0, note: 'rozmiary.band.petite'   },
  { from: 12, to: 15, add: 0, note: 'rozmiary.band.standard' },
  { from: 16, to: 19, add: 0, note: 'rozmiary.band.larger'   },
  { from: 20, to: 24, add: 0, note: 'rozmiary.band.widest'   },
];

/* =============================================================================
   DATA – 4. RINGS
   price       = base price: silver 930, standard size (12–15) – real prices
                 from Laura
   photos      = file names from zdj/customs/ (without -640.jpg / -1280.jpg)
   wksMin/Max  = base lead time in weeks
   preset      = what is selected when you land on the ring page
   materials   = which MATERIALS ids this exact piece actually comes in
                 (omit to allow all of them; most pieces here are silver-only,
                 so the picker on the ring page just doesn't show up)
   Stone colour and shape are NOT restricted per ring any more – every piece
   offers the full STONES/STONE_SHAPES lists (see cfg.stonecolour /
   cfg.stoneshape pickers below).
   shortPl/textPl = Polish versions of short/text, shown when the site is
                 switched to PL (see i18n.js) – name and id stay the same
                 in both languages, they are the piece's own name
   ============================================================================= */
const RINGS = [
  {
    id: 'ashleen', nr: '01', name: 'Ashleen', drop: 1,
    short: 'thin hammered band with a single stone',
    shortPl: 'cienka kuta obrączka z jednym kamieniem',
    text: 'A narrow, textured band with one round zircon set into it – the kind of ring that looks right stacked three at a time, one colour each.',
    textPl: 'Wąska, teksturowana obrączka z jedną okrągłą cyrkonią – pierścionek, który dobrze wygląda noszony po trzy naraz, każdy w innym kolorze.',
    price: 420, wksMin: 2, wksMax: 3,
    photos: ['ashleen-1', 'ashleen-2', 'ashleen-3'],
    materials: ['silver930'],
    preset: { material: 'silver930', stone: 'cyrkonia', colour: 0, size: 13 },
  },
  {
    id: 'courtney', nr: '02', name: 'Courtney', drop: 1,
    short: 'wide signet with one large stone',
    shortPl: 'szeroki sygnet z jednym dużym kamieniem',
    text: 'The wide, chunky one – hand-textured all the way round, with a large square-cut zircon set high on the face.',
    textPl: 'Ten szeroki, masywny – ręcznie teksturowany dookoła, z dużą cyrkonią o kwadratowym szlifie osadzoną wysoko na powierzchni.',
    price: 550, wksMin: 3, wksMax: 4,
    photos: ['courtney-1b', 'courtney-2b', 'courtney-3', 'courtney-4'],
    materials: ['silver930'],
    preset: { material: 'silver930', stone: 'cyrkonia', colour: 0, size: 14 },
  },
  {
    id: 'delia', nr: '03', name: 'Delia', drop: 1,
    short: 'signet with a rectangular stone',
    shortPl: 'sygnet z prostokątnym kamieniem',
    text: 'A signet-shaped face holding one rectangular zircon, textured band underneath. Reads a little like a worn family ring.',
    textPl: 'Sygnetowa powierzchnia z jedną prostokątną cyrkonią, teksturowana obrączka pod spodem. Wygląda trochę jak noszony rodzinny pierścionek.',
    price: 550, wksMin: 2, wksMax: 3,
    photos: ['delia-1b', 'delia-2'],
    materials: ['silver930'],
    preset: { material: 'silver930', stone: 'cyrkonia', colour: 0, size: 13 },
  },
  {
    id: 'genevieve', nr: '04', name: 'Genevieve', drop: 1,
    short: 'rectangular signet, two stones',
    shortPl: 'prostokątny sygnet, dwa kamienie',
    text: 'A rectangular signet face set with two zircons side by side – shown in green and pink, so it reads as one deliberate pair rather than a mismatch.',
    textPl: 'Prostokątna powierzchnia sygnetu z dwiema cyrkoniami obok siebie – pokazana w zieleni i różu, więc czyta się to jako świadomą parę, nie przypadkowe zestawienie.',
    price: 820, wksMin: 3, wksMax: 4,
    photos: ['genevieve-1', 'genevieve-2b', 'genevieve-3', 'genevieve-4', 'genevieve-5'],
    materials: ['silver930'],
    preset: { material: 'silver930', stone: 'cyrkonia', colour: 0, size: 14 },
  },
  {
    id: 'kathleen', nr: '05', name: 'Kathleen', drop: 1,
    short: 'sculptural setting, one stone',
    shortPl: 'rzeźbiarska oprawa, jeden kamień',
    text: 'The most sculptural piece I make – an organic, almost hand-carved setting around a single zircon, on a heavily textured band.',
    textPl: 'Najbardziej rzeźbiarski element, jaki robię – organiczna, niemal ręcznie rzeźbiona oprawa wokół jednej cyrkonii, na mocno teksturowanej obrączce.',
    price: 500, wksMin: 2, wksMax: 3,
    photos: ['kathleen-1', 'kathleen-2', 'kathleen-3'],
    materials: ['silver930'],
    preset: { material: 'silver930', stone: 'cyrkonia', colour: 0, size: 13 },
  },
  {
    id: 'odette', nr: '06', name: 'Odette', drop: 1,
    short: 'open toi-et-moi, two stones',
    shortPl: 'otwarty toi-et-moi, dwa kamienie',
    text: 'An open band that wraps almost all the way round, a navy zircon set at one end and a brown one at the other. Sits slightly loose by design – that is the point.',
    textPl: 'Otwarta obrączka, która owija się niemal dookoła – granatowa cyrkonia na jednym końcu, brązowa na drugim. Celowo siedzi trochę luźno – o to właśnie chodzi.',
    price: 740, wksMin: 3, wksMax: 4,
    photos: ['odette-1b', 'odette-2'],
    materials: ['silver930'],
    preset: { material: 'silver930', stone: 'cyrkonia', colour: 0, size: 14 },
  },

  /* ---------------------------------------------------------------------------
     DROP 02 – real gemstones and charms, so no zircon pickers here.
     Extra fields used only by these pieces:
       sizes   = the only size(s) the piece comes in (one size → no picker,
                 just shown as info). Leave it out → free choice SIZE_MIN–MAX.
       stones: false = hide the stone / colour / shape pickers
       details / detailsPl = what it is made of – shown on the tile, the ring
                 page and in the order email instead of the zircon choice
       price: null = quoted individually ("price on request")
     PHOTOS: taken automatically from the folder zdjecia/<id>/ (see
     zdjecia/JAK-DODAC-ZDJECIA.txt) – the order of the files is the order
     of the photos, so there is no photos list to keep in sync here.
     textPl = Polish description, shown when the site is switched to PL.
                 No shortPl – short is only used as the photo alt text here.
     ready: true = the piece already exists – shows "ready to ship" instead
                 of a lead time. Only the custom one (no ready) has a lead time
                 (wksMin/wksMax, still a placeholder).
     --------------------------------------------------------------------------- */
  {
    id: 'amber-teapot', nr: '01', name: 'The One with Amber and the Teapot', drop: 2,
    short: 'chunky silver ring with amber and a teapot charm',
    text: 'Irregular, eye-catching ring that comes with a little orange teapot, because why not? It has amber that goes with it perfectly. This chunky piece will make your whole outfit but also bring some warmth to your day.',
    textPl: 'Nieregularny, przyciągający wzrok pierścionek z mini pomarańczowym czajniczkiem, który przywiozłam z Tajlandii. Główną rolę gra w nim bursztyn zamieszczony centralnie i okuty w srebrze. Ten chunky pierścionek zrobi twój cały outfit i przyniesie trochę ciepła do twojego dnia.',
    details: 'silver · amber · teapot charm from Bangkok',
    detailsPl: 'srebro · bursztyn · charms-czajniczek z Bangkoku',
    price: 650, ready: true,
    sizes: [12], stones: false,
    materials: ['silver930'],
    preset: { material: 'silver930', size: 12 },
  },
  {
    id: 'amethyst', nr: '02', name: 'The One with Amethyst', drop: 2,
    short: 'oval statement ring with an amethyst',
    text: 'This oval shaped ring makes a statement by its weight and insanely gorgeous gemstone. You will love how much sun it catches, thanks to the "see-through" stone setting. It goes with every outfit, but also makes an outfit on its own. If You\'re looking for something classy yet original, this one\'s for You.',
    textPl: 'Owalny pierścionek, który robi wrażenie swoją masą i przepięknym kamieniem. Pokochasz jak dużo słońca przez niego przechodzi, dzięki specjalnemu osadzeniu kamienia. Ten pierścionek będzie pasował do każdego outfitu, niezależnie czy stawiasz na klasykę, czy na coś nietypowego.',
    details: 'silver · amethyst',
    detailsPl: 'srebro · ametyst',
    price: 820, ready: true,
    sizes: [14], stones: false,
    materials: ['silver930'],
    preset: { material: 'silver930', size: 14 },
  },
  {
    id: 'crown-star', nr: '03', name: 'The One with a Crown and a Star', drop: 2,
    short: 'crown-shaped band with a star charm',
    text: 'This crown-shaped ring speaks Modern Princess, as it expresses her (maybe yours?) vibe. It comes with a star charm, because there\'s always a place for extra spark. There\'s no gemstone in this piece, so it\'s great if You\'re looking for something less expressive but also meaningful.',
    textPl: 'Ten sygnet w kształcie korony jest niezbędnikiem każdej Modern Princess, bo jednak każda księżniczka zasługuje na koronę, niezależnie od jej formy. Do korony została dołączona gwiazdka, bo dodatkowy blask jest zawsze mile widziany, prawda? Ten sygnet to idealny statement ring, który jest mniej ekspresyjny niż reszta kolekcji 02, ale bardzo symboliczny.',
    details: 'silver · star charm from Bangkok',
    detailsPl: 'srebro · charms-gwiazdka z Bangkoku',
    price: 650, ready: true,
    sizes: [13], stones: false,
    materials: ['silver930'],
    preset: { material: 'silver930', size: 13 },
  },
  {
    id: 'moonstone-charms', nr: '04', name: 'The One with Moonstone and Charms', drop: 2,
    short: 'chunky ring built around a moonstone, with charms',
    text: 'This huge chunky piece has a lot of light and gives some magical energy. Silver is built around the stone, as the gem plays the main role here. It\'s a really original piece that obviously catches attention, but also will remind You to take a moment for yourself and just admire everything that\'s happening inside this gemstone and inside of You.',
    textPl: 'To chyba największy pierścionek z kolekcji 02, który odbija masę światła i zaraża magiczną energią. Srebro jest w nim obudowane wokół kamienia, gdyż ten gra tutaj główną rolę. Ten pierścionek to inny poziom oryginalności.',
    details: 'silver · moonstone · charms from Bangkok',
    detailsPl: 'srebro · kamień księżycowy · charmsy z Bangkoku',
    price: 850, ready: true,
    sizes: [12], stones: false,
    materials: ['silver930'],
    preset: { material: 'silver930', size: 12 },
  },
  {
    id: 'gemstone-charm', nr: '05', name: 'The One with Gemstone and Charm of Your Choice', drop: 2,
    custom: true,
    short: 'your gemstone, your charm, any size',
    text: 'If You have your favourite gemstone that speaks to You, You can customize it with one of the charms from my collection (You can see them all in the gallery). How it works: add this piece to the bag, which sends your order to me by email. In the email let me know which gemstone You chose, which charm and which design (You can send me pics of any of my designs from my website or Instagram). If You have your own design or sketch, just send me the references and we will work with that :)',
    textPl: 'Ta opcja jest dla Ciebie, jeżeli spodobał Ci się któryś z pierścionków, ale nie jest w twoim rozmiarze, lub jeżeli masz własny pomysł na pierścionek. Jak to działa: dodajesz ten projekt do koszyka, a następnie zostajesz przekierowany na email, w którym podajesz mi swój rozmiar, wybrany model pierścionka, kamień, który chciałbyś zamieścić oraz wypatrzonego charmsa. Możesz wysłać mi w email fotki wybranego pierścionka (również z kolekcji 01) lub własny projekt w postaci rysunku/inspiracji itp.',
    details: 'silver · gemstone and charm of your choice',
    detailsPl: 'srebro · kamień i charms do wyboru',
    detailsNote: 'gemstone, charm and design – tell me in the email',
    detailsNotePl: 'kamień, charms i projekt – napisz w mailu',
    price: null, wksMin: 3, wksMax: 4,
    stones: false,
    materials: ['silver930'],
    preset: { material: 'silver930', size: 13 },
  },
];

/* Photos from the zdjecia/ folders (generated zdjecia.js) win over the
   hand-written photos lists above – ring id = folder name. */
if (typeof ZDJECIA !== 'undefined') {
  RINGS.forEach(r => { if (ZDJECIA[r.id] && ZDJECIA[r.id].length) r.photos = ZDJECIA[r.id]; });
}

/* =============================================================================
   DATA – 5. DROPS (collections under the "shop" menu)
   ============================================================================= */
const DROPS = {
  1: { nr: '01', name: 'drop', namePl: 'drop', subtitle: 'made to order', text: 'Six pieces, each one built around a real design of mine. All of them can be made in your size, with your choice of zircon colour.' },
  2: { nr: '02', name: 'drop', namePl: 'drop', subtitle: 'gemstones and charms', text: 'Five pieces with real gemstones and charms from Bangkok.' },
};

/* =============================================================================
   CONTACT – orders land here
   ============================================================================= */
const ORDER_EMAIL = 'artarual1@gmail.com';
const INSTAGRAM   = 'artarual.jewellery';
const INSTAGRAM_URL = 'https://www.instagram.com/artarual.jewellery/';


/* =============================================================================
   =============  LOGIC – normally nothing below needs changing  ==============
   ============================================================================= */

const PHOTO_DIR = 'zdj/customs/';  // where the ring product photos live
const SESJA_DIR = 'zdj/web/';      // where the photoshoot/session photos live

/** name with a "/" is already a full path (photos from zdjecia.js). */
function photoSrc(name, w, dir = PHOTO_DIR) {
  return name.includes('/') ? `${name}-${w}.jpg` : `${dir}${name}-${w}.jpg`;
}

/** <img> with srcset – the browser picks 400 / 640 / 1280 px itself. */
function photoTag(name, alt, sizes, cls, dir = PHOTO_DIR) {
  return `<img src="${photoSrc(name, 640, dir)}"
    srcset="${photoSrc(name, 400, dir)} 400w, ${photoSrc(name, 640, dir)} 640w, ${photoSrc(name, 1280, dir)} 1280w"
    sizes="${sizes}" alt="${alt}" loading="lazy" decoding="async"${cls ? ` class="${cls}"` : ''}>`;
}

function zl(n) { return `${Math.round(n).toLocaleString('pl-PL')} zł`; }

/** Polish plural of "week" (tydzień/tygodnie/tygodni) – the one bit of
    grammar t()'s flat dictionary can't hold, so it lives here instead. */
function plWeekWord(n) {
  if (n === 1) return 'tydzień';
  const mod10 = n % 10, mod100 = n % 100;
  if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return 'tygodnie';
  return 'tygodni';
}

function weeks(n) {
  if (getLang() === 'pl') return `${n} ${plWeekWord(n)}`;
  return n === 1 ? '1 week' : `${n} weeks`;
}

function weekRange(min, max) {
  if (min === max) return weeks(min);
  if (getLang() === 'pl') return `${min}–${max} ${plWeekWord(max)}`;
  return `${min}–${max} weeks`;
}

const findMaterial = id => MATERIALS.find(m => m.id === id) || MATERIALS[0];
const findStone    = id => STONES.find(s => s.id === id)    || STONES[0];
const findRing     = id => RINGS.find(r => r.id === id);

/* ----- language-aware labels: PL field if the site is switched to PL and
   the field exists, English otherwise. Keeps DATA above readable – every
   entry just carries a plain "…Pl" sibling next to the English value. ----- */
const mLabel  = m  => getLang() === 'pl' ? (m.namePl || m.name)   : m.name;
const sLabel  = s  => getLang() === 'pl' ? (s.namePl || s.name)   : s.name;
const cLabel  = c  => getLang() === 'pl' ? (c.namePl || c.name)   : c.name;
const shLabel = sh => getLang() === 'pl' ? (sh.namePl || sh.name) : sh.name;
const bandLabel = band => t(band.note); // band.note is already an i18n key
const ringShort = r => getLang() === 'pl' ? (r.shortPl || r.short) : r.short;
const ringText  = r => getLang() === 'pl' ? (r.textPl  || r.text)  : r.text;
const dropLabel = d => getLang() === 'pl' ? (d.namePl  || d.name)  : d.name;
const ringDetails = r => getLang() === 'pl' ? (r.detailsPl || r.details) : r.details;
const ringDetailsNote = r => getLang() === 'pl' ? (r.detailsNotePl || r.detailsNote) : r.detailsNote;

/** Sizes a ring can be ordered in: its own list, or the full range. */
function ringSizes(r) {
  if (r.sizes && r.sizes.length) return r.sizes;
  const all = [];
  for (let s = SIZE_MIN; s <= SIZE_MAX; s++) all.push(s);
  return all;
}
const fixedSize = r => !!(r.sizes && r.sizes.length === 1);

function sizeBand(size) {
  return SIZE_BANDS.find(b => size >= b.from && size <= b.to) || SIZE_BANDS[1];
}

/** null = quoted individually (ring without a set price). */
function calcPrice(ring, materialId, stoneId, size) {
  if (ring.price == null) return null;
  const stoneAdd = ring.stones === false ? 0 : findStone(stoneId).add;
  return ring.price
    + findMaterial(materialId).add
    + stoneAdd
    + sizeBand(size).add;
}

function priceFrom(ring) {
  if (ring.price == null) return null;
  // cheapest material available – size no longer changes the price
  const cheapest = MATERIALS.reduce((a, b) => (a.add <= b.add ? a : b));
  return ring.price + cheapest.add;
}

function calcLeadTime(ring, materialId, stoneId) {
  const m = findMaterial(materialId);
  const s = findStone(stoneId);
  let min = ring.wksMin + m.wks;
  let max = ring.wksMax + m.wks;
  if (s.order) { min += 1; max += 2; }
  return weekRange(min, max);
}


/* -----------------------------------------------------------------------------
   Ring listing (home page, drops, collection)
   ----------------------------------------------------------------------------- */

/** Caption under the name: preset material + stone – like "925 Sterling Silver / Swarovski". */
function materialCaption(r) {
  if (r.details) return ringDetails(r);
  const m = findMaterial(r.preset.material);
  const s = findStone(r.preset.stone);
  return `${mLabel(m)} / ${sLabel(s)}`;
}

function tile(r) {
  const alt = `${r.name} – ${ringShort(r)}`;
  // must match .gallery's real column widths at each breakpoint in styles.css –
  // a stale value here makes the browser under-fetch resolution and the grid
  // looks softer than the (correctly-sized) product page
  const sizes = '(max-width:560px) 92vw, (max-width:720px) 46vw, (max-width:1024px) 30vw, 23vw';
  const second = r.photos[1];
  const pl = getLang() === 'pl';
  const viewLabel = pl ? 'zobacz i skonfiguruj' : 'view and configure';
  // one fixed size → one fixed price, no "from"; no price → on request
  const priceText = r.price == null
    ? (pl ? 'cena indywidualna' : 'price on request')
    : `${fixedSize(r) ? '' : (pl ? 'od ' : 'from ')}${zl(priceFrom(r))}`;
  return `
    <article class="piece" data-category="drop-${r.drop}">
      <a href="produkt.html?id=${r.id}" aria-label="${r.name} – ${viewLabel}">
        <div class="piece__frame">
          ${photoTag(r.photos[0], alt, sizes)}
          ${second ? photoTag(second, '', sizes, 'piece__img--alt') : ''}
        </div>
        <div class="piece__meta">
          <span class="piece__name">${r.name}</span>
          <span class="piece__price">${priceText}</span>
        </div>
        <p class="piece__desc">${materialCaption(r)}</p>
      </a>
    </article>`;
}

/** Rings with the newest drop first (stable within a drop). */
const newestFirst = () => [...RINGS].sort((a, b) => b.drop - a.drop);

/** Fills every [data-lista] with rings: "all" | "drop:1" | "n:6" (newest drop first) */
function renderLists() {
  document.querySelectorAll('[data-lista]').forEach(el => {
    const filter = el.dataset.lista;
    let list = newestFirst();
    if (filter.startsWith('drop:')) {
      list = RINGS.filter(r => String(r.drop) === filter.slice(5));
    } else if (filter.startsWith('n:')) {
      list = newestFirst().slice(0, Number(filter.slice(2)));
    }
    el.innerHTML = list.map(tile).join('');
  });
  wireFilters();
  window.observeReveal?.();
}

/** Filters above the grid (kolekcja.html). Wired after render, because the
    tiles only exist at this point – script.js would run on an empty list. */
function wireFilters() {
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


/* -----------------------------------------------------------------------------
   Bag – kept in localStorage. No payments: the whole bag is sent as one email.
   ----------------------------------------------------------------------------- */
const BAG_KEY = 'artarual-bag';

function bagRead() {
  try { return JSON.parse(localStorage.getItem(BAG_KEY)) || []; }
  catch { return []; }
}
function bagWrite(items) {
  try { localStorage.setItem(BAG_KEY, JSON.stringify(items)); } catch {}
  bagRefresh();
}
function bagAdd(item) { const b = bagRead(); b.push(item); bagWrite(b); }
function bagRemove(i) { const b = bagRead(); b.splice(i, 1); bagWrite(b); }
function bagTotal() { return bagRead().reduce((sum, it) => sum + (it.price || 0), 0); }
/** True if any bag item still needs an individual gold quote. */
function bagHasQuoted() { return bagRead().some(it => it.price == null); }

/** Updates the counter in the header and redraws the drawer if it is open. */
function bagRefresh() {
  const n = bagRead().length;
  document.querySelectorAll('[data-bag-count]').forEach(el => { el.textContent = n; });
  const panel = document.querySelector('#bag-body');
  if (panel) bagDraw();
}

function bagMailto() {
  const items = bagRead();
  if (!items.length) return '#';
  const lines = items.map((it, i) => (
`${i + 1}. ${it.name} (${t('nav.drop')} ${it.nr})
   ${t('cfg.mail.material')} ${it.material}
   ${t('cfg.mail.stone')} ${it.stone}
   ${t('cfg.mail.size')} ${it.size} (${it.size + 40} mm)
   ${t('cfg.mail.price')} ${it.priceText || zl(it.price)}
   ${t('cfg.mail.lead')} ${it.lead}`
  )).join('\n\n');

  const totalLine = bagHasQuoted()
    ? `${t('cfg.mail.totalexcl')} ${zl(bagTotal())}`
    : `${t('cfg.mail.total')} ${zl(bagTotal())}`;

  const body =
`${t('cfg.mail.hi')}

${t('cfg.mail.order')}

${lines}

${totalLine}

${t('cfg.mail.details')}
`;
  const subject = items.length === 1
    ? t('cfg.mail.subject.one')
    : t('cfg.mail.subject.many').replace('{n}', items.length);
  return `mailto:${ORDER_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function bagDraw() {
  const body = document.querySelector('#bag-body');
  const foot = document.querySelector('#bag-foot');
  if (!body) return;
  const items = bagRead();

  if (!items.length) {
    body.innerHTML = `<p class="bag__empty">${t('cfg.bag.empty')}</p>`;
    foot.innerHTML = '';
    return;
  }

  body.innerHTML = items.map((it, i) => `
    <div class="bag__item">
      <div class="bag__thumb">${it.photo ? `<img src="${photoSrc(it.photo, 400)}" alt="">` : ''}</div>
      <div class="bag__info">
        <span class="bag__name">${it.name}</span>
        <p class="bag__spec">${it.material}<br>${it.stone}<br>${t('cfg.size')} ${it.size} · ${it.lead}</p>
      </div>
      <div class="bag__side">
        <span class="bag__price">${it.priceText || zl(it.price)}</span>
        <button type="button" class="bag__remove" data-remove="${i}">${t('cfg.bag.remove')}</button>
      </div>
    </div>`).join('');

  foot.innerHTML = `
    <div class="bag__total"><span>${bagHasQuoted() ? t('cfg.bag.totalexcl') : t('cfg.bag.total')}</span><span>${zl(bagTotal())}</span></div>
    <a href="${bagMailto()}" class="btn btn-primary bag__send">${t('cfg.bag.send')}</a>
    <p class="bag__note">${t('cfg.bag.note')}</p>`;

  body.querySelectorAll('[data-remove]').forEach(b => {
    b.addEventListener('click', () => bagRemove(Number(b.dataset.remove)));
  });
}

function bagOpen()  { document.querySelector('#bag')?.classList.add('open'); bagDraw(); }
function bagClose() { document.querySelector('#bag')?.classList.remove('open'); }

/** Builds the drawer once and wires the header trigger. */
function initBag() {
  if (!document.querySelector('#bag')) {
    const el = document.createElement('div');
    el.id = 'bag';
    el.className = 'bag';
    el.innerHTML = `
      <div class="bag__backdrop" data-bag-close></div>
      <aside class="bag__panel" role="dialog" aria-modal="true" aria-label="${t('cfg.bag.title')}" data-i18n-attr="aria-label:cfg.bag.title">
        <header class="bag__head">
          <span><span data-i18n="cfg.bag.title">${t('cfg.bag.title')}</span> (<span data-bag-count>0</span>)</span>
          <button type="button" class="bag__close" data-bag-close aria-label="${t('cfg.bag.close')}" data-i18n-attr="aria-label:cfg.bag.close">✕</button>
        </header>
        <div class="bag__body" id="bag-body"></div>
        <footer class="bag__foot" id="bag-foot"></footer>
      </aside>`;
    document.body.appendChild(el);
    el.querySelectorAll('[data-bag-close]').forEach(b => b.addEventListener('click', bagClose));
  }

  document.querySelectorAll('[data-bag-open]').forEach(b => {
    b.addEventListener('click', e => { e.preventDefault(); bagOpen(); });
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') bagClose(); });
  bagRefresh();
}


/* -----------------------------------------------------------------------------
   Ring page – configurator
   ----------------------------------------------------------------------------- */
function renderRing() {
  const root = document.querySelector('#produkt');
  if (!root) return;

  const id = new URLSearchParams(location.search).get('id');
  const r = findRing(id) || RINGS[0];
  const dropNr = DROPS[r.drop] ? DROPS[r.drop].nr : '01'; // the drop's own number, not the ring's

  document.title = `${r.name} – ARTarual`;

  const preset = r.preset;
  const state = {
    material: findMaterial(preset.material).id,
    stone:    findStone(preset.stone).id,
    colour:   preset.colour || 0,
    shape:    null,
    size:     ringSizes(r).includes(preset.size) ? preset.size : ringSizes(r)[0],
    photo:    0,
  };
  const noStones = r.stones === false;
  const oneSize = fixedSize(r);

  root.innerHTML = `
    <div class="product">
      <div class="pgal">
        <div class="pgal__main" id="pgal-main"></div>
        ${r.photos.length > 1 ? '<div class="pgal__thumbs" id="pgal-thumbs" role="tablist" aria-label="Ring photos"></div>' : ''}
      </div>

      <div class="product__cfg">
        <div class="product__head">
          <span class="product__no">${DROPS[r.drop] ? dropLabel(DROPS[r.drop]) : t('nav.drop')} ${dropNr}</span>
          <h1>${r.name}</h1>
          <p class="product__lede">${ringText(r)}</p>
          <div class="product-facts">
            <div><strong>${t('cfg.made.label')}</strong>${t('cfg.made')}</div>
          </div>
        </div>

        <div class="opt" id="opt-material">
          <label class="opt__label" for="sel-material">${t('cfg.material')}</label>
          <div class="select-wrap"><select id="sel-material"></select></div>
        </div>

        <div class="opt" id="opt-stone">
          <label class="opt__label" for="sel-stone">${t('cfg.stone')}</label>
          <div class="select-wrap"><select id="sel-stone"></select></div>
        </div>

        <div class="opt" id="opt-colour">
          <div class="opt__head"><h3>${t('cfg.stonecolour')}</h3><span class="opt__pick" id="colour-pick"></span></div>
          <div class="chips" id="colour-chips"></div>
          <p class="size-help">${t('cfg.colournote')}</p>
        </div>

        <div class="opt" id="opt-shape">
          <label class="opt__label" for="sel-shape">${t('cfg.stoneshape')}</label>
          <div class="select-wrap"><select id="sel-shape"></select></div>
        </div>

        <div class="opt">
          <div class="opt__head"><h3>${t('cfg.size')}</h3><span class="opt__pick" id="pick-size"></span></div>
          <div class="sizes" id="sizes"></div>
          <p class="size-help">${oneSize ? t('cfg.sizefixed') : t('cfg.sizehelp')}</p>
        </div>

        <div class="summary">
          <div class="summary__price">
            <span class="val" id="price">–</span>
            <span class="from">${t('cfg.perpiece')}</span>
          </div>
          ${r.sizes || r.price == null ? '' : `<p class="summary__pricenote">${t('cfg.pricenote')}</p>`}
          <ul class="summary__rows" id="breakdown"></ul>
          <span class="lead-badge">${r.ready ? '' : `${t('cfg.leadtime')} `}<span id="lead">–</span></span>
          <div class="btn-row">
            <button type="button" class="btn btn-primary" id="add-to-bag">${t('cfg.addtobag')}</button>
            <button type="button" class="btn btn-ghost" id="copy">${t('cfg.copyconfig')}</button>
            <span class="copied" id="copied">${t('cfg.copied')}</span>
          </div>
          <p class="summary__note">${t('cfg.paynote')}</p>
        </div>
      </div>
    </div>`;

  /* --- photos --- */
  const elMain = root.querySelector('#pgal-main');
  const elThumbs = root.querySelector('#pgal-thumbs');

  function drawPhotos() {
    elMain.innerHTML = photoTag(r.photos[state.photo], `${r.name} – ${t('cfg.photo')} ${state.photo + 1}`, '(max-width:1080px) 92vw, 460px');
    if (!elThumbs) return;
    elThumbs.innerHTML = r.photos.map((p, i) => `
      <button type="button" role="tab" aria-selected="${i === state.photo}" aria-label="${t('cfg.photo')} ${i + 1}">
        <img src="${photoSrc(p, 400)}" alt="" loading="lazy">
      </button>`).join('');
    elThumbs.querySelectorAll('button').forEach((b, i) => {
      b.addEventListener('click', () => { state.photo = i; drawPhotos(); });
    });
  }

  elMain.addEventListener('click', () => openLightbox(photoSrc(r.photos[state.photo], 1280), r.name));

  /* --- options ---
     r.materials (optional, set per ring in the DATA section) narrows the
     material picker down to what that specific piece actually comes in –
     most of these are silver-only, so it just doesn't show up. Stone
     colour and shape are the same full list for every ring; a picker only
     hides itself when there is truly nothing to choose (one option). */
  const selMat     = root.querySelector('#sel-material');
  const optMaterial = root.querySelector('#opt-material');
  const selStone   = root.querySelector('#sel-stone');
  const optStone   = root.querySelector('#opt-stone');
  const colourChips = root.querySelector('#colour-chips');
  const colourPick  = root.querySelector('#colour-pick');
  const optColour  = root.querySelector('#opt-colour');
  const selShape   = root.querySelector('#sel-shape');
  const optShape   = root.querySelector('#opt-shape');
  const elSizes    = root.querySelector('#sizes');

  function delta(add) {
    if (!add) return '';
    return ` (${add > 0 ? '+' : '−'}${zl(Math.abs(add))})`;
  }

  /** Materials this specific ring actually comes in (defaults to all). */
  function activeMaterials() {
    return r.materials ? MATERIALS.filter(m => r.materials.includes(m.id)) : MATERIALS;
  }

  /** Colour variants for the stone the ring currently has selected. */
  function activeColours(stone) { return stone.colours; }

  /** Every available stone shape/cut – same list for every ring. */
  function activeShapes() { return STONE_SHAPES; }

  function drawMaterials() {
    const mats = activeMaterials();
    if (!mats.some(m => m.id === state.material)) state.material = mats[0].id;
    if (mats.length <= 1) {
      optMaterial.style.display = 'none';
      selMat.innerHTML = mats.map(m => `<option value="${m.id}" selected>${mLabel(m)}</option>`).join('');
      return;
    }
    optMaterial.style.display = '';
    selMat.innerHTML = mats.map(m =>
      `<option value="${m.id}"${m.id === state.material ? ' selected' : ''}>${mLabel(m)}${delta(m.add)}</option>`
    ).join('');
  }

  function drawStones() {
    if (noStones || STONES.length <= 1) {
      optStone.style.display = 'none';
      selStone.innerHTML = STONES.map(s => `<option value="${s.id}" selected>${sLabel(s)}</option>`).join('');
      return;
    }
    optStone.style.display = '';
    selStone.innerHTML = STONES.map(s =>
      `<option value="${s.id}"${s.id === state.stone ? ' selected' : ''}>${sLabel(s)}${delta(s.add)}</option>`
    ).join('');
  }

  function drawColours() {
    const s = findStone(state.stone);
    const colours = activeColours(s);
    if (noStones || !colours.length) { optColour.style.display = 'none'; return; }
    if (colours.length === 1) { optColour.style.display = 'none'; state.colour = 0; }
    else optColour.style.display = '';
    if (state.colour >= colours.length) state.colour = 0;
    // real swatch buttons, not a native <select> – <option> ignores inline
    // colour styling in most browsers, so that route never actually showed
    // the colour at all
    colourChips.innerHTML = colours.map((c, i) => `
      <button type="button" class="chip" data-i="${i}" aria-pressed="${i === state.colour}">
        <span class="dot" style="background:${c.hex}"></span>${cLabel(c)}
      </button>`).join('');
    colourPick.textContent = cLabel(colours[state.colour]);
  }

  function drawShapes() {
    const shapes = activeShapes();
    if (noStones) { optShape.style.display = 'none'; state.shape = null; return; }
    if (!shapes.some(sh => sh.id === state.shape)) state.shape = shapes[0].id;
    if (shapes.length <= 1) {
      optShape.style.display = 'none';
      selShape.innerHTML = shapes.map(sh => `<option value="${sh.id}" selected>${shLabel(sh)}</option>`).join('');
      return;
    }
    optShape.style.display = '';
    selShape.innerHTML = shapes.map(sh =>
      `<option value="${sh.id}"${sh.id === state.shape ? ' selected' : ''}>${shLabel(sh)}</option>`
    ).join('');
  }

  function drawSizes() {
    let html = '';
    for (const s of ringSizes(r)) {
      const add = sizeBand(s).add;
      html += `
        <button type="button" class="size-btn" data-s="${s}" aria-pressed="${s === state.size}">
          <span class="n">${s}</span>
          <span class="mm">${s + 40} mm</span>
          <span class="d">${add ? (add > 0 ? '+' : '−') + Math.abs(add) + ' zł' : ''}</span>
        </button>`;
    }
    elSizes.innerHTML = html;
    elSizes.querySelectorAll('.size-btn').forEach(b => b.addEventListener('click', () => {
      state.size = Number(b.dataset.s); recalc();
    }));
  }

  selMat.addEventListener('change', () => { state.material = selMat.value; recalc(); });
  selStone.addEventListener('change', () => { state.stone = selStone.value; state.colour = 0; state.shape = null; recalc(); });
  colourChips.addEventListener('click', e => {
    const btn = e.target.closest('.chip');
    if (!btn) return;
    state.colour = Number(btn.dataset.i);
    recalc();
  });
  selShape.addEventListener('change', () => { state.shape = selShape.value; recalc(); });

  /* --- summary --- */
  function config() {
    const m = findMaterial(state.material);
    const s = findStone(state.stone);
    const colours = activeColours(s);
    const colour = colours.length ? colours[state.colour] : null;
    const shape = STONE_SHAPES.find(sh => sh.id === state.shape) || null;
    const price = calcPrice(r, state.material, state.stone, state.size);
    const quote = !!m.quote || price == null;
    const stoneBits = [colour ? cLabel(colour) : null, shape ? shLabel(shape) : null].filter(Boolean).join(', ');
    // drop 02 pieces: no zircon choice – their fixed make-up stands in for it
    const note = ringDetailsNote(r);
    const stoneText = noStones
      ? `${ringDetails(r)}${note ? ` (${note})` : ''}`
      : `${sLabel(s)}${stoneBits ? ` (${stoneBits})` : ''}`;
    return {
      m, s, colour, shape, quote, price,
      priceText: quote ? t('cfg.onrequest') : zl(price),
      lead: r.ready ? t('cfg.ready')
        : noStones ? weekRange(r.wksMin, r.wksMax) : calcLeadTime(r, state.material, state.stone),
      stoneText,
    };
  }

  function recalc() {
    drawMaterials(); drawStones(); drawColours(); drawShapes(); drawSizes(); drawPhotos();

    const c = config();
    root.querySelector('#pick-size').textContent = `${state.size} · ${state.size + 40} mm`;
    root.querySelector('#price').textContent = c.priceText;
    root.querySelector('#lead').textContent = c.lead;

    root.querySelector('#breakdown').innerHTML = `
      <li><span class="k">${t('cfg.bd.material')}</span><span class="v">${mLabel(c.m)}${c.m.quote ? ` – ${t('cfg.quoted')}` : ''}</span></li>
      <li><span class="k">${noStones ? t('cfg.bd.details') : t('cfg.bd.stone')}</span><span class="v">${c.stoneText}</span></li>
      <li><span class="k">${t('cfg.bd.size')}</span><span class="v">${state.size} (${state.size + 40} mm)${oneSize ? '' : ` · ${bandLabel(sizeBand(state.size))}`}</span></li>`;

    const text =
`${t('cfg.copy.ring')} ${r.name} (${t('nav.drop')} ${dropNr})
${t('cfg.copy.material')} ${mLabel(c.m)}${c.m.quote ? ` (${t('cfg.quoted')})` : ''}
${t('cfg.copy.stone')} ${c.stoneText}
${t('cfg.copy.size')} ${state.size} (${state.size + 40} mm)
${t('cfg.copy.price')} ${c.priceText}
${t('cfg.copy.lead')} ${c.lead}`;
    root.querySelector('#copy').dataset.text = text;
  }

  root.querySelector('#copy').addEventListener('click', e => {
    const txt = e.currentTarget.dataset.text || '';
    const ok = root.querySelector('#copied');
    navigator.clipboard?.writeText(txt).then(() => {
      ok.classList.add('show');
      setTimeout(() => ok.classList.remove('show'), 1800);
    }).catch(() => {});
  });

  root.querySelector('#add-to-bag').addEventListener('click', e => {
    const c = config();
    // material/stone are stored as already-translated text, in whichever
    // language was active at the moment of adding – switching language
    // afterwards won't retranslate items already sitting in the bag.
    bagAdd({
      id: r.id, name: r.name, nr: dropNr, photo: r.photos[0],
      material: mLabel(c.m), stone: c.stoneText, size: state.size,
      price: c.quote ? null : c.price, priceText: c.priceText, lead: c.lead,
    });
    const btn = e.currentTarget;
    btn.textContent = t('cfg.added');
    setTimeout(() => { btn.textContent = t('cfg.addtobag'); }, 1400);
    bagOpen();
  });

  recalc();
  renderRelated(r);
}

/** "You may also like" – three other rings under the configurator. */
function renderRelated(r) {
  const el = document.querySelector('#podobne');
  if (!el) return;
  // same drop first, then the rest
  const others = RINGS.filter(x => x.id !== r.id);
  const sorted = [...others.filter(x => x.drop === r.drop), ...others.filter(x => x.drop !== r.drop)];
  el.innerHTML = sorted.slice(0, 3).map(tile).join('');
  window.observeReveal?.();
}


/* -----------------------------------------------------------------------------
   Photo wall (photoshoot.html) – a rotating slice of the shoot.
   Seeded by the date, so it looks the same all day and different tomorrow
   – no build step, no images that never get seen.
   ----------------------------------------------------------------------------- */
const SESJA = [
  'IMG_2165', 'IMG_2231', 'IMG_2233', 'IMG_2238', 'IMG_2239', 'IMG_2262',
  'IMG_2836', 'IMG_2840', 'IMG_2841', 'IMG_2842', 'IMG_2845',
  'IMG_2847', 'IMG_2849', 'IMG_2850', 'IMG_2851', 'IMG_2858',
  'IMG_2861', 'IMG_2862', 'IMG_2863', 'IMG_2866', 'IMG_2868', 'IMG_2869', 'IMG_2870',
];
const PHOTO_WALL_COUNT = 14;

function mulberry32(seed) {
  return function () {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function daySeed() {
  const d = new Date();
  return d.getFullYear() * 1000 + Math.floor((d - new Date(d.getFullYear(), 0, 0)) / 86400000);
}

/** Newest shoot, from the folder zdjecia/sesja/ (via generated zdjecia.js). */
const NOWA_SESJA = (typeof ZDJECIA !== 'undefined' && ZDJECIA.sesja) || [];

function renderPhotoWall() {
  const el = document.querySelector('[data-photowall]');
  if (!el) return;
  const rnd = mulberry32(daySeed());
  const order = SESJA.map(name => ({ name, k: rnd() })).sort((a, b) => a.k - b.k);
  // the newest shoot is always on the wall, in its own order; the older
  // shoot fills the rest with a different slice every day
  const fill = Math.max(PHOTO_WALL_COUNT - NOWA_SESJA.length, 0);
  const picks = [...NOWA_SESJA.map(name => ({ name })), ...order.slice(0, fill)];
  el.innerHTML = picks.map(({ name }) =>
    `<figure>${photoTag(name, t('cfg.photowall.alt'), '(max-width:560px) 92vw, (max-width:1024px) 46vw, 31vw', null, SESJA_DIR)}</figure>`
  ).join('');
  window.observeReveal?.();
}

/** [data-collage-sesja] – the first 5 photos of zdjecia/kolaz/ (or of
    zdjecia/sesja/ if there is no kolaz folder): one big
    tile + four small ones (layout in styles.css, .collage--five). */
function renderSessionCollage() {
  document.querySelectorAll('[data-collage-sesja]').forEach(el => {
    const src = (typeof ZDJECIA !== 'undefined' && ZDJECIA.kolaz && ZDJECIA.kolaz.length) ? ZDJECIA.kolaz : NOWA_SESJA;
    const photos = src.slice(0, 5);
    if (!photos.length) return;
    el.innerHTML = photos.map((name, i) =>
      `<figure>${photoTag(name, t('cfg.photowall.alt'), i === 0 ? '(max-width:1024px) 92vw, 50vw' : '(max-width:1024px) 46vw, 25vw')}</figure>`
    ).join('');
    el.querySelectorAll('figure').forEach((f, i) => {
      f.style.cursor = 'zoom-in';
      f.addEventListener('click', () => openLightbox(photoSrc(photos[i], 1280), t('cfg.photowall.alt')));
    });
  });
}


/* -----------------------------------------------------------------------------
   Lightbox
   ----------------------------------------------------------------------------- */
function openLightbox(src, alt) {
  let lb = document.querySelector('.lightbox');
  if (!lb) {
    lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.innerHTML = `<button class="lightbox__close" aria-label="Close">✕</button><img alt="">`;
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
  renderLists();
  renderRing();
  renderPhotoWall();
  renderSessionCollage();
  initBag();

  // photos marked [data-zoom] also open full screen
  document.querySelectorAll('[data-zoom]').forEach(el => {
    el.style.cursor = 'zoom-in';
    el.addEventListener('click', () => openLightbox(el.dataset.zoom, el.querySelector('img')?.alt));
  });
});
