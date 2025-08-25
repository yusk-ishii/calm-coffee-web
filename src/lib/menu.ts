import { getLenis } from './singletons';

const lenis = getLenis();
const html = document.documentElement;

function menuOpen() {
  html.classList.add('open');
  html.dataset.scrollLock = 'true';
}

function menuClose() {
  if (!html.classList.contains('open')) return;
  html.classList.remove('open');
  html.classList.add('close');
  html.dataset.scrollLock = 'false';
}

/** ハンバーガーボタンクリックでメニューを開閉 */
function registerMenuButton() {
  const menuButton = document.getElementById('js-menu-button');
  menuButton?.addEventListener('click', () => {
    if (!html.classList.contains('open')) {
      menuOpen();
    } else {
      menuClose();
    }
  });

  menuButton?.firstElementChild?.addEventListener('animationend', () => {
    if (html.classList.contains('close')) {
      html.classList.remove('close');
    }
  });
}

/** メニュー内リンククリックでメニューを閉じる */
function registerLinks() {
  const nav = document.getElementById('js-nav');
  const links = nav?.querySelectorAll<HTMLAnchorElement>('.nav-list a');

  links?.forEach((link) => {
    link.addEventListener('click', () => {
      if (link.hash) {
        menuClose();
        lenis?.scrollTo(link.hash, {
          duration: 1,
          easing: (x: number) => {
            return Math.sin((x * Math.PI) / 2);
          },
        });
      }
    });
  });
}

/** 初期化 */
function initMenu() {
  registerMenuButton();
  registerLinks();
}

const setupSwup = () => {
  if (!window.swup) return;
  initMenu();

  window.swup.hooks.on('page:view', () => {
    initMenu();
    menuClose();
  });
};
if (window.swup) {
  setupSwup();
} else {
  document.addEventListener('swup:enable', setupSwup);
}
