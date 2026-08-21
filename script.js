// ARTarual — shared interactions
document.addEventListener('DOMContentLoaded', () => {
  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }));
  }

  // "sklep" submenu — hover on desktop (CSS), click/tap accordion on mobile
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
