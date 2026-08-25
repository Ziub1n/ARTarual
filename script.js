// ARTarual — shared interactions
document.addEventListener('DOMContentLoaded', () => {
  // Nav drawer — slides in from the left, with a backdrop, same pattern as the bag
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  const navBackdrop = document.querySelector('.nav-backdrop');
  if (toggle && nav) {
    const navSetOpen = open => {
      nav.classList.toggle('open', open);
      navBackdrop?.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    };
    toggle.addEventListener('click', () => navSetOpen(!nav.classList.contains('open')));
    document.querySelectorAll('[data-nav-close]').forEach(el => el.addEventListener('click', () => navSetOpen(false)));
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navSetOpen(false)));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') navSetOpen(false); });
  }

  // "sklep" submenu — click/tap accordion, same on every screen size
  document.querySelectorAll('.has-sub').forEach(item => {
    const btn = item.querySelector('.sub-toggle');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const open = item.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
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
