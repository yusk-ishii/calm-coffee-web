import { gsap } from 'gsap';
import { getLenis } from './singletons';

const lenis = getLenis();
const html = document.documentElement;
function easeOutSine(x: number): number {
  return Math.sin((x * Math.PI) / 2);
}

function menuOpen() {
  html.classList.add('open');
  html.dataset.menuStatus = 'open';
}

function menuClose() {
  html.classList.add('close');
  html.classList.remove('open');
}

function menuCloseComplete() {
  html.dataset.menuStatus = 'close';
  html.classList.remove('close');
}

/** ハンバーガーボタンクリックでメニューを開閉 */
function registerMenuEvent() {
  const menuButton = document.getElementById('menu-button') as HTMLElement;
  const gnav = document.getElementById('global-menu') as HTMLElement;
  const gnavInner = gnav.querySelector('.global-menu-inner') as HTMLElement;
  const nav = gnav.querySelector('.nav') as HTMLElement;
  const links = nav.querySelectorAll<HTMLAnchorElement>('.nav-list a');
  const sns = gnav.querySelector('.sns');
  const shopInfo = gnav.querySelector('.shop-info-details');
  const defaults = { duration: 0.5, ease: easeOutSine };

  const menuOpenTl = gsap.timeline({
    paused: true,
    defaults,
  });
  menuOpenTl
    .fromTo(
      gnav,
      {
        autoAlpha: 0,
      },
      {
        autoAlpha: 1,
        onStart: menuOpen,
      },
    )
    .from(
      [...links, sns, shopInfo],
      {
        opacity: 0,
        y: 5,
        stagger: 0.08,
      },
      '0.1',
    );

  const menuCloseTl = gsap.timeline({ paused: true, defaults });
  menuCloseTl
    .to(gnav, {
      autoAlpha: 0,
      onStart: menuClose,
      onComplete: menuCloseComplete,
    })
    .to(gnavInner, { opacity: 0, y: -10 }, '<');

  menuButton.addEventListener('click', () => {
    if (!html.classList.contains('open')) {
      menuCloseTl.pause(0);
      menuOpenTl.play(0);
    } else {
      menuCloseTl.play(0);
    }
  });

  // menuButton?.firstElementChild?.addEventListener('animationend', () => {
  //   if (html.classList.contains('close')) {
  //     html.classList.remove('close');
  //   }
  // });

  links?.forEach((link) => {
    link.addEventListener('click', () => {
      if (link.hash) {
        menuCloseTl.progress(1);
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
  registerMenuEvent();
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
