const html = document.documentElement;
const menuButton = document.getElementById('js-menu-button');
const nav = document.getElementById('js-nav');
const anchorLinks = nav?.querySelectorAll('.nav-list a');

menuButton?.addEventListener('click', () => {
  if (!html.classList.contains('open')) {
    menuOpen();
  } else {
    menuClose();
  }
});

function menuOpen() {
  html.classList.add('open');
  html.dataset.scrollLock = 'true';
}

function menuClose() {
  html.classList.remove('open');
  html.classList.add('close');
  html.dataset.scrollLock = 'false';
}

menuButton?.firstElementChild?.addEventListener('animationend', () => {
  if (html.classList.contains('close')) {
    html.classList.remove('close');
  }
});

if (html.dataset.pathname === 'top') {
  anchorLinks?.forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = (e.currentTarget as HTMLAnchorElement).hash;
      if (targetId) {
        menuClose();
      }
    });
  });
}
