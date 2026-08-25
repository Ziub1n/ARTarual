// ARTarual — shared interactions

/* Scroll reveal — sections/tiles fade and rise a little as they enter
   the viewport. observeReveal() is exposed on window so products.js can
   call it again after it rebuilds a gallery/photo wall (those elements
   do not exist yet on the first, page-load pass). Respects
   prefers-reduced-motion via the .reveal override in styles.css. */
const REVEAL_SELECTORS = [
  '.sec-head', '.step', '.stuff__item', '.story-list .row',
  '.collage > figure', '.wall > figure', '.statement', '.cta-split',
  '.piece', '.photo-wall figure',
].join(', ');

const revealIO = ('IntersectionObserver' in window)
  ? new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealIO.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' })
  : null;

function observeReveal(root = document) {
  if (!revealIO) return; // no IntersectionObserver support — just show everything, no fallback needed since .reveal starts unstyled without JS
  root.querySelectorAll(REVEAL_SELECTORS).forEach((el) => {
    if (el.classList.contains('reveal')) return; // already wired up on an earlier pass
    el.classList.add('reveal');
    revealIO.observe(el);
  });
}
window.observeReveal = observeReveal;

document.addEventListener('DOMContentLoaded', () => {
  observeReveal();

  // Nav drawer — slides in from the left, with a backdrop, same pattern as the bag
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  const navBackdrop = document.querySelector('.nav-backdrop');
  if (toggle && nav) {
    const navSetOpen = open => {
      nav.classList.toggle('open', open);
      navBackdrop?.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (!open) {
        // "Shop" stayed expanded across drawer close/reopen otherwise —
        // reset it once the drawer has finished sliding away, so the menu
        // always starts collapsed the next time it opens
        setTimeout(() => {
          nav.querySelectorAll('.has-sub.open').forEach(item => {
            item.classList.remove('open');
            item.querySelector('.sub-toggle')?.setAttribute('aria-expanded', 'false');
          });
        }, 320);
      }
    };
    toggle.addEventListener('click', () => navSetOpen(!nav.classList.contains('open')));
    document.querySelectorAll('[data-nav-close]').forEach(el => el.addEventListener('click', () => navSetOpen(false)));
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navSetOpen(false)));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') navSetOpen(false); });
  }

  // "sklep" submenu — click/tap accordion, same on every screen size
  const hasSubItems = document.querySelectorAll('.has-sub');
  console.log('[debug] .has-sub found:', hasSubItems.length); // TEMP — remove after diagnosing
  hasSubItems.forEach(item => {
    const btn = item.querySelector('.sub-toggle');
    console.log('[debug] .sub-toggle for this item:', btn); // TEMP
    if (!btn) return;
    btn.addEventListener('click', () => {
      const open = item.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      const subnav = item.querySelector('.subnav');
      console.log('[debug] toggle clicked — open:', open, '| subnav computed display:', subnav && getComputedStyle(subnav).display); // TEMP
    });
  });
  // klik poza menu / Escape zamyka rozwinięte podmenu
  document.addEventListener('click', (e) => {
    document.querySelectorAll('.has-sub.open').forEach(item => {
      if (!item.contains(e.target)) {
        item.classList.remove('open');
        item.querySelector('.sub-toggle')?.setAttribute('aria-expanded', 'false');
      }
    });
  });
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    document.querySelectorAll('.has-sub.open').forEach(item => {
      item.classList.remove('open');
      item.querySelector('.sub-toggle')?.setAttribute('aria-expanded', 'false');
    });
  });

  // Contact form (front-end only — no backend wired up yet)
  const form = document.querySelector('#contact-form');
  const success = document.querySelector('#form-success');
  if (form && success) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      success.classList.add('show');
      success.setAttribute('role', 'status');
      form.reset();
      success.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }
});
