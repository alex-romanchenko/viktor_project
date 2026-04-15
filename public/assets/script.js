// Burger menu
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

if (burger && nav) {
  burger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', String(isOpen));
  });

  // Close menu on link click (mobile)
  nav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      nav.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });
}

// Tabs
const tabs = document.querySelectorAll('.tab');
const panes = document.querySelectorAll('.pane');

tabs.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;

    tabs.forEach(t => t.classList.remove('is-active'));
    btn.classList.add('is-active');

    panes.forEach(p => {
      p.classList.toggle('is-active', p.id === target);
    });
  });
});

// Footer year
const year = document.getElementById('year');
if (year) year.textContent = String(new Date().getFullYear());

const scrollTopBtn = document.getElementById('scrollTopBtn');

if (scrollTopBtn) {
  const toggleScrollTopBtn = () => {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add('is-visible');
    } else {
      scrollTopBtn.classList.remove('is-visible');
    }
  };

  window.addEventListener('scroll', toggleScrollTopBtn);

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  toggleScrollTopBtn();
}