const html = document.documentElement;
const menuButton = document.getElementById('js-menu-button');
const nav = document.getElementById('js-nav');
const navLinks = nav?.querySelectorAll('.nav-list a');

menuButton?.addEventListener('click', () => {
  html.classList.toggle('open');
});

navLinks?.forEach((link) => {
  link.addEventListener('click', () => {
    html.classList.remove('open');
  });
});
