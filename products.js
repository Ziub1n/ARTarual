/* =============================================================================
   ARTarual — shop data, ring configurator and bag

   ⚠️  EVERYTHING THAT CHANGES DAY TO DAY (prices, stones, materials,
       lead times, photos) lives in the "DATA" section below.
       The rest of the file is logic — normally you don't need to touch it.

   PRICES, WIDTHS, WEIGHTS AND LEAD TIMES ARE PLACEHOLDERS — swap them for
   the real ones. Everything else (names, material, stone colours) is taken
   from Laura's own notes on the ring photos.
   ============================================================================= */

/* =============================================================================
   DATA — 1. MATERIALS
   Only two options for this collection: silver at a fixed price, or gold
   quoted individually (quote: true → no surcharge is added automatically,
   the UI shows "quoted individually" instead of a number).
   add  = surcharge on the base price (zł, can be negative)
   wks  = how many weeks it adds to the lead time
   ============================================================================= */
const MATERIALS = [
  { id: 'silver930', name: 'sterling silver 930', note: 'standard for this collection', add: 0, wks: 0, colour: '#D9D9DE' },
  { id: 'gold',       name: '14k gold',           note: 'quoted individually — message me before ordering', add: 0, wks: 2, colour: '#F0C75E', quote: true },
];

/* =============================================================================
   DATA — 2. STONES
   This collection only comes with cubic zirconia — but in a lot of colours.
   colours = colour variants (name + swatch)
   ============================================================================= */
const STONES = [
  { id: 'none', name: 'no stone', add: 0, order: false, colours: [] },
  { id: 'cyrkonia', name: 'cubic zirconia', add: 90, order: false, colours: [
    { name: 'sky blue', hex: '#7EC8E3' },
    { name: 'blue',     hex: '#2B4C8C' },
    { name: 'navy',     hex: '#1F3A5F' },
    { name: 'burgundy', hex: '#76202D' },
    { name: 'yellow',   hex: '#DFA236' },
    { name: 'green',    hex: '#3E8C5A' },
    { name: 'pink',     hex: '#D6538C' },
    { name: 'tea',      hex: '#B08D57' },
  ]},
];

/* =============================================================================
   DATA — 3. SIZES AND SIZE-BASED PRICING
   Size is given on the PL scale (inner circumference in mm = size + 40).
   The bigger the ring, the more metal — hence the surcharge.
   ============================================================================= */
const SIZE_MIN = 8;
const SIZE_MAX = 24;

const SIZE_BANDS = [
  { from: 8,  to: 11, add: -25, note: 'petite'   },
  { from: 12, to: 15, add: 0,   note: 'standard' },
  { from: 16, to: 19, add: 35,  note: 'larger'   },
  { from: 20, to: 24, add: 75,  note: 'widest'   },
];

/* =============================================================================
   DATA — 4. RINGS
   price       = base price: silver 930, no stone, standard size (12–15)
   photos      = file names from zdj/customs/ (without -640.jpg / -1280.jpg)
   wksMin/Max  = base lead time in weeks
   preset      = what is selected when you land on the ring page
   materials   = which MATERIALS ids this exact piece actually comes in
                 (omit to allow all of them; most pieces here are silver-only,
                 so the picker on the ring page just doesn't show up)
   stoneColours = which of the cubic zirconia colour names (from STONES
                 above) this exact piece actually comes in — taken from
                 Laura's own notes on the ring photos
   ============================================================================= */
const RINGS = [
  {
    id: 'ashleen', nr: '01', name: 'Ashleen', drop: 1,
    short: 'thin hammered band with a single stone',
    text: 'A narrow, textured band with one round zircon set into it — the kind of ring that looks right stacked three at a time, one colour each.',
    price: 240, width: '2 mm', weight: '~3 g', wksMin: 2, wksMax: 3,
    photos: ['ashleen-1', 'ashleen-2', 'ashleen-3'],
    materials: ['silver930'],
    stoneColours: ['sky blue', 'burgundy', 'blue'],
    preset: { material: 'silver930', stone: 'cyrkonia', colour: 0, size: 13 },
  },
  {
    id: 'courtney', nr: '02', name: 'Courtney', drop: 1,
    short: 'wide signet with one large stone',
    text: 'The wide, chunky one — hand-textured all the way round, with a large square-cut zircon set high on the face.',
    price: 380, width: '9 mm', weight: '~10 g', wksMin: 3, wksMax: 4,
    photos: ['courtney-1', 'courtney-2', 'courtney-3', 'courtney-4'],
    materials: ['silver930'],
    stoneColours: ['sky blue'],
    preset: { material: 'silver930', stone: 'cyrkonia', colour: 0, size: 14 },
  },
  {
    id: 'delia', nr: '03', name: 'Delia', drop: 1,
    short: 'signet with a rectangular stone',
    text: 'A signet-shaped face holding one rectangular zircon, textured band underneath. Reads a little like a worn family ring.',
    price: 320, width: '7 mm', weight: '~7 g', wksMin: 2, wksMax: 3,
    photos: ['delia-1', 'delia-2'],
    materials: ['silver930'],
    stoneColours: ['yellow'],
    preset: { material: 'silver930', stone: 'cyrkonia', colour: 0, size: 13 },
  },
  {
    id: 'genevieve', nr: '04', name: 'Genevieve', drop: 1,
    short: 'rectangular signet, two stones',
    text: 'A rectangular signet face set with two zircons side by side — shown in green and pink, so it reads as one deliberate pair rather than a mismatch.',
    price: 410, width: '10 mm face', weight: '~11 g', wksMin: 3, wksMax: 4,
    photos: ['genevieve-1', 'genevieve-2', 'genevieve-3', 'genevieve-4', 'genevieve-5'],
    materials: ['silver930'],
    stoneColours: ['green', 'pink'],
    preset: { material: 'silver930', stone: 'cyrkonia', colour: 0, size: 14 },
  },
  {
    id: 'kathleen', nr: '05', name: 'Kathleen', drop: 1,
    short: 'sculptural setting, one stone',
    text: 'The most sculptural piece I make — an organic, almost hand-carved setting around a single zircon, on a heavily textured band.',
    price: 290, width: '3 mm', weight: '~4 g', wksMin: 2, wksMax: 3,
    photos: ['kathleen-1', 'kathleen-2', 'kathleen-3'],
    materials: ['silver930'],
    stoneColours: ['pink'],
    preset: { material: 'silver930', stone: 'cyrkonia', colour: 0, size: 13 },
  },
  {
    id: 'odette', nr: '06', name: 'Odette', drop: 1,
    short: 'open toi-et-moi, two stones',
    text: 'An open band that wraps almost all the way round, a navy zircon set at one end and a tea-coloured one at the other. Sits slightly loose by design — that is the point.',
    price: 350, width: '3 mm', weight: '~5 g', wksMin: 3, wksMax: 4,
    photos: ['odette-1', 'odette-2'],
    materials: ['silver930'],
    stoneColours: ['navy', 'tea'],
    preset: { material: 'silver930', stone: 'cyrkonia', colour: 0, size: 14 },
  },
];

/* -----------------------------------------------------------------------------
   A second drop does not exist yet — nothing here should look purchasable
   until it does. Add a DROPS[2] entry and give new rings drop: 2 when it launches.
----------------------------------------------------------------------------- */

/* =============================================================================
   DATA — 5. DROPS (collections under the "shop" menu)
   ============================================================================= */
const DROPS = {
  1: { name: 'drop', subtitle: 'made to order', text: 'Six pieces, each one built around a real design of mine. All of them can be made in your size, with your choice of zircon colour.' },
};

/* =============================================================================
   CONTACT — orders land here
   ============================================================================= */
const ORDER_EMAIL = 'artarual1@gmail.com';
const INSTAGRAM   = 'artarual.jewellery';
const INSTAGRAM_URL = 'https://www.instagram.com/artarual.jewellery/';


/* =============================================================================
   =============  LOGIC — normally nothing below needs changing  ==============
   ============================================================================= */

const PHOTO_DIR = 'zdj/customs/';  // where the ring product photos live
const SESJA_DIR = 'zdj/web/';      // where the photoshoot/session photos live

function photoSrc(name, w, dir = PHOTO_DIR) { return `${dir}${name}-${w}.jpg`; }

/** <img> with srcset — the browser picks 400 / 640 / 1280 px itself. */
function photoTag(name, alt, sizes, cls, dir = PHOTO_DIR) {
  return `<img src="${photoSrc(name, 640, dir)}"
    srcset="${photoSrc(name, 400, dir)} 400w, ${photoSrc(name, 640, dir)} 640w, ${photoSrc(name, 1280, dir)} 1280w"
    sizes="${sizes}" alt="${alt}" loading="lazy" decoding="async"${cls ? ` class="${cls}"` : ''}>`;
}

function zl(n) { return `${Math.round(n).toLocaleString('pl-PL')} zł`; }

function weeks(n) { return n === 1 ? '1 week' : `${n} weeks`; }

function weekRange(min, max) {
  return min === max ? weeks(min) : `${min}–${max} weeks`;
}

const findMaterial = id => MATERIALS.find(m => m.id === id) || MATERIALS[0];
const findStone    = id => STONES.find(s => s.id === id)    || STONES[0];
const findRing     = id => RINGS.find(r => r.id === id);

function sizeBand(size) {
  return SIZE_BANDS.find(b => size >= b.from && size <= b.to) || SIZE_BANDS[1];
}

function calcPrice(ring, materialId, stoneId, size) {
  return ring.price
    + findMaterial(materialId).add
    + findStone(stoneId).add
    + sizeBand(size).add;
}

function priceFrom(ring) {
  // cheapest sensible combination: no stone, smallest band, cheapest material
  const cheapest = MATERIALS.reduce((a, b) => (a.add <= b.add ? a : b));
  return ring.price + cheapest.add + SIZE_BANDS[0].add;
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

/** Caption under the name: preset material + stone — like "925 Sterling Silver / Swarovski". */
function materialCaption(r) {
  const m = findMaterial(r.preset.material);
  const s = findStone(r.preset.stone);
  return s.id === 'none' ? m.name : `${m.name} / ${s.name}`;
}

function tile(r) {
  const alt = `${r.name} — ${r.short}`;
  const sizes = '(max-width:720px) 46vw, (max-width:1024px) 30vw, 23vw';
  const second = r.photos[1];
  return `
    <article class="piece" data-category="drop-${r.drop}">
      <a href="produkt.html?id=${r.id}" aria-label="${r.name} — view and configure">
        <div class="piece__frame">
          ${photoTag(r.photos[0], alt, sizes)}
          ${second ? photoTag(second, '', sizes, 'piece__img--alt') : ''}
        </div>
        <div class="piece__meta">
          <span class="piece__name">${r.name}</span>
          <span class="piece__price">from ${zl(priceFrom(r))}</span>
        </div>
        <p class="piece__desc">${materialCaption(r)}</p>
      </a>
    </article>`;
}

/** Fills every [data-lista] with rings: "all" | "drop:1" | "n:6" */
function renderLists() {
  document.querySelectorAll('[data-lista]').forEach(el => {
    const filter = el.dataset.lista;
    let list = RINGS;
    if (filter.startsWith('drop:')) {
      list = RINGS.filter(r => String(r.drop) === filter.slice(5));
    } else if (filter.startsWith('n:')) {
      list = RINGS.slice(0, Number(filter.slice(2)));
    }
    el.innerHTML = list.map(tile).join('');
  });
  wireFilters();
}

/** Filters above the grid (kolekcja.html). Wired after render, because the
    tiles only exist at this point — script.js would run on an empty list. */
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
   Bag — kept in localStorage. No payments: the whole bag is sent as one email.
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
`${i + 1}. ${it.name} (no ${it.nr})
   material:  ${it.material}
   stone:     ${it.stone}
   size:      ${it.size} (${it.size + 40} mm)
   price:     ${it.priceText || zl(it.price)}
   lead time: ${it.lead}`
  )).join('\n\n');

  const totalLine = bagHasQuoted()
    ? `Total (excluding pieces quoted individually): ${zl(bagTotal())}`
    : `Total: ${zl(bagTotal())}`;

  const body =
`Hi Laura!

I would like to order:

${lines}

${totalLine}

My details / notes:
`;
  return `mailto:${ORDER_EMAIL}?subject=${encodeURIComponent(`Order — ${items.length} ${items.length === 1 ? 'ring' : 'rings'}`)}&body=${encodeURIComponent(body)}`;
}

function bagDraw() {
  const body = document.querySelector('#bag-body');
  const foot = document.querySelector('#bag-foot');
  if (!body) return;
  const items = bagRead();

  if (!items.length) {
    body.innerHTML = '<p class="bag__empty">Your bag is empty. Pick a ring, set it up, and it will land here.</p>';
    foot.innerHTML = '';
    return;
  }

  body.innerHTML = items.map((it, i) => `
    <div class="bag__item">
      <div class="bag__thumb">${it.photo ? `<img src="${photoSrc(it.photo, 400)}" alt="">` : ''}</div>
      <div class="bag__info">
        <span class="bag__name">${it.name}</span>
        <p class="bag__spec">${it.material}<br>${it.stone}<br>size ${it.size} · ${it.lead}</p>
      </div>
      <div class="bag__side">
        <span class="bag__price">${it.priceText || zl(it.price)}</span>
        <button type="button" class="bag__remove" data-remove="${i}">remove</button>
      </div>
    </div>`).join('');

  foot.innerHTML = `
    <div class="bag__total"><span>total${bagHasQuoted() ? ' (excl. quoted)' : ''}</span><span>${zl(bagTotal())}</span></div>
    <a href="${bagMailto()}" class="btn btn-primary bag__send">send order by email</a>
    <p class="bag__note">No payment here — I confirm every order personally by email, so we can agree the size and details before I start.</p>`;

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
      <aside class="bag__panel" role="dialog" aria-modal="true" aria-label="Bag">
        <header class="bag__head">
          <span>bag (<span data-bag-count>0</span>)</span>
          <button type="button" class="bag__close" data-bag-close aria-label="Close bag">✕</button>
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
   Ring page — configurator
   ----------------------------------------------------------------------------- */
function renderRing() {
  const root = document.querySelector('#produkt');
  if (!root) return;

  const id = new URLSearchParams(location.search).get('id');
  const r = findRing(id) || RINGS[0];

  document.title = `${r.name} — ARTarual`;

  const preset = r.preset;
  const state = {
    material: findMaterial(preset.material).id,
    stone:    findStone(preset.stone).id,
    colour:   preset.colour || 0,
    size:     preset.size || 13,
    photo:    0,
  };

  root.innerHTML = `
    <div class="product">
      <div class="pgal">
        <div class="pgal__main" id="pgal-main"></div>
        ${r.photos.length > 1 ? '<div class="pgal__thumbs" id="pgal-thumbs" role="tablist" aria-label="Ring photos"></div>' : ''}
      </div>

      <div class="product__cfg">
        <div class="product__head">
          <span class="product__no">no ${r.nr} · ${DROPS[r.drop] ? DROPS[r.drop].name : ''}</span>
          <h1>${r.name}</h1>
          <p class="product__lede">${r.text}</p>
          <div class="product-facts">
            <div><strong>width</strong>${r.width}</div>
            <div><strong>weight</strong>${r.weight}</div>
            <div><strong>made</strong>by hand, in Warsaw</div>
          </div>
        </div>

        <div class="opt" id="opt-material">
          <label class="opt__label" for="sel-material">material</label>
          <div class="select-wrap"><select id="sel-material"></select></div>
        </div>

        <div class="opt">
          <label class="opt__label" for="sel-stone">stone</label>
          <div class="select-wrap"><select id="sel-stone"></select></div>
        </div>

        <div class="opt" id="opt-colour">
          <label class="opt__label" for="sel-colour">stone colour</label>
          <div class="select-wrap"><select id="sel-colour"></select></div>
        </div>

        <div class="opt">
          <div class="opt__head"><h3>size</h3><span class="opt__pick" id="pick-size"></span></div>
          <div class="sizes" id="sizes"></div>
          <p class="size-help">Not sure of your size? <a href="rozmiary.html" class="text-link">measure it in 2 minutes</a></p>
        </div>

        <div class="summary">
          <div class="summary__price">
            <span class="val" id="price">—</span>
            <span class="from">per piece</span>
          </div>
          <ul class="summary__rows" id="breakdown"></ul>
          <span class="lead-badge">lead time: <span id="lead">—</span></span>
          <div class="btn-row">
            <button type="button" class="btn btn-primary" id="add-to-bag">add to bag</button>
            <button type="button" class="btn btn-ghost" id="copy">copy configuration</button>
            <span class="copied" id="copied">copied</span>
          </div>
          <p class="summary__note">There is no payment here — everything in the bag goes to me as one email, and I confirm it personally before I start making anything.</p>
        </div>
      </div>
    </div>`;

  /* --- photos --- */
  const elMain = root.querySelector('#pgal-main');
  const elThumbs = root.querySelector('#pgal-thumbs');

  function drawPhotos() {
    elMain.innerHTML = photoTag(r.photos[state.photo], `${r.name} — photo ${state.photo + 1}`, '(max-width:1080px) 92vw, 46vw');
    if (!elThumbs) return;
    elThumbs.innerHTML = r.photos.map((p, i) => `
      <button type="button" role="tab" aria-selected="${i === state.photo}" aria-label="Photo ${i + 1}">
        <img src="${photoSrc(p, 400)}" alt="" loading="lazy">
      </button>`).join('');
    elThumbs.querySelectorAll('button').forEach((b, i) => {
      b.addEventListener('click', () => { state.photo = i; drawPhotos(); });
    });
  }

  elMain.addEventListener('click', () => openLightbox(photoSrc(r.photos[state.photo], 1280), r.name));

  /* --- options ---
     r.materials / r.stoneColours (both optional, set per ring below in
     the DATA section) narrow the pickers down to what that specific
     piece actually comes in — most of these only exist in silver, and
     in one or two of the eight zircon colours, not all of them. */
  const selMat     = root.querySelector('#sel-material');
  const optMaterial = root.querySelector('#opt-material');
  const selStone   = root.querySelector('#sel-stone');
  const selColour  = root.querySelector('#sel-colour');
  const optColour  = root.querySelector('#opt-colour');
  const elSizes    = root.querySelector('#sizes');

  function delta(add) {
    if (!add) return '';
    return ` (${add > 0 ? '+' : '−'}${zl(Math.abs(add))})`;
  }

  /** Materials this specific ring actually comes in (defaults to all). */
  function activeMaterials() {
    return r.materials ? MATERIALS.filter(m => r.materials.includes(m.id)) : MATERIALS;
  }

  /** Colour variants this specific ring actually comes in (defaults to all of that stone's). */
  function activeColours(stone) {
    if (!stone.colours.length) return [];
    return r.stoneColours ? stone.colours.filter(c => r.stoneColours.includes(c.name)) : stone.colours;
  }

  function drawMaterials() {
    const mats = activeMaterials();
    if (!mats.some(m => m.id === state.material)) state.material = mats[0].id;
    if (mats.length <= 1) {
      optMaterial.style.display = 'none';
      selMat.innerHTML = mats.map(m => `<option value="${m.id}" selected>${m.name}</option>`).join('');
      return;
    }
    optMaterial.style.display = '';
    selMat.innerHTML = mats.map(m =>
      `<option value="${m.id}"${m.id === state.material ? ' selected' : ''}>${m.name}${delta(m.add)}</option>`
    ).join('');
  }

  function drawStones() {
    selStone.innerHTML = STONES.map(s =>
      `<option value="${s.id}"${s.id === state.stone ? ' selected' : ''}>${s.name}${delta(s.add)}</option>`
    ).join('');
  }

  function drawColours() {
    const s = findStone(state.stone);
    const colours = activeColours(s);
    if (!colours.length) { optColour.style.display = 'none'; return; }
    if (colours.length === 1) { optColour.style.display = 'none'; state.colour = 0; }
    else optColour.style.display = '';
    if (state.colour >= colours.length) state.colour = 0;
    selColour.innerHTML = colours.map((c, i) =>
      `<option value="${i}"${i === state.colour ? ' selected' : ''}>${c.name}</option>`
    ).join('');
  }

  function drawSizes() {
    let html = '';
    for (let s = SIZE_MIN; s <= SIZE_MAX; s++) {
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
  selStone.addEventListener('change', () => { state.stone = selStone.value; state.colour = 0; recalc(); });
  selColour.addEventListener('change', () => { state.colour = Number(selColour.value); recalc(); });

  /* --- summary --- */
  function config() {
    const m = findMaterial(state.material);
    const s = findStone(state.stone);
    const colours = activeColours(s);
    const colour = colours.length ? colours[state.colour] : null;
    const quote = !!m.quote;
    const price = calcPrice(r, state.material, state.stone, state.size);
    return {
      m, s, colour, quote, price,
      priceText: quote ? 'on request' : zl(price),
      lead: calcLeadTime(r, state.material, state.stone),
      stoneText: s.id === 'none' ? 'no stone' : `${s.name}${colour ? ` (${colour.name})` : ''}`,
    };
  }

  function recalc() {
    drawMaterials(); drawStones(); drawColours(); drawSizes(); drawPhotos();

    const c = config();
    root.querySelector('#pick-size').textContent = `${state.size} · ${state.size + 40} mm`;
    root.querySelector('#price').textContent = c.priceText;
    root.querySelector('#lead').textContent = c.lead;

    root.querySelector('#breakdown').innerHTML = `
      <li><span class="k">material</span><span class="v">${c.m.name}${c.quote ? ' — quoted individually' : ''}</span></li>
      <li><span class="k">stone</span><span class="v">${c.stoneText}</span></li>
      <li><span class="k">size</span><span class="v">${state.size} (${state.size + 40} mm) · ${sizeBand(state.size).note}</span></li>
      <li><span class="k">width</span><span class="v">${r.width}</span></li>`;

    const text =
`Ring:      ${r.name} (no ${r.nr})
Material:  ${c.m.name}${c.quote ? ' (quoted individually)' : ''}
Stone:     ${c.stoneText}
Size:      ${state.size} (${state.size + 40} mm)
Price:     ${c.priceText}
Lead time: ${c.lead}`;
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
    bagAdd({
      id: r.id, name: r.name, nr: r.nr, photo: r.photos[0],
      material: c.m.name, stone: c.stoneText, size: state.size,
      price: c.quote ? null : c.price, priceText: c.priceText, lead: c.lead,
    });
    const btn = e.currentTarget;
    btn.textContent = 'added';
    setTimeout(() => { btn.textContent = 'add to bag'; }, 1400);
    bagOpen();
  });

  recalc();
  renderRelated(r);
}

/** "You may also like" — three other rings under the configurator. */
function renderRelated(r) {
  const el = document.querySelector('#podobne');
  if (!el) return;
  el.innerHTML = RINGS.filter(x => x.id !== r.id).slice(0, 3).map(tile).join('');
}


/* -----------------------------------------------------------------------------
   Photo wall (photoshoot.html) — a rotating slice of the shoot.
   Seeded by the date, so it looks the same all day and different tomorrow
   — no build step, no images that never get seen.
   ----------------------------------------------------------------------------- */
const SESJA = [
  'IMG_2165', 'IMG_2231', 'IMG_2233', 'IMG_2238', 'IMG_2239', 'IMG_2262',
  'IMG_2836', 'IMG_2840', 'IMG_2841', 'IMG_2842', 'IMG_2843', 'IMG_2845',
  'IMG_2847', 'IMG_2849', 'IMG_2850', 'IMG_2851', 'IMG_2858', 'IMG_2860',
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

function renderPhotoWall() {
  const el = document.querySelector('[data-photowall]');
  if (!el) return;
  const rnd = mulberry32(daySeed());
  const order = SESJA.map(name => ({ name, k: rnd() })).sort((a, b) => a.k - b.k);
  const picks = order.slice(0, PHOTO_WALL_COUNT);
  el.innerHTML = picks.map(({ name }) =>
    `<figure>${photoTag(name, 'From the ARTarual photoshoot', '(max-width:560px) 92vw, (max-width:1024px) 46vw, 31vw', null, SESJA_DIR)}</figure>`
  ).join('');
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
  initBag();

  // photos marked [data-zoom] also open full screen
  document.querySelectorAll('[data-zoom]').forEach(el => {
    el.style.cursor = 'zoom-in';
    el.addEventListener('click', () => openLightbox(el.dataset.zoom, el.querySelector('img')?.alt));
  });
});
