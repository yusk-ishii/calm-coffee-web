import { gsap } from 'gsap';
import { getLenis } from './utils/lenis';

const html = document.documentElement;

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
  const defaults = { duration: 0.4, ease: 'sine.out' };

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
        duration: 0.5,
        opacity: 0,
        filter: 'blur(10px)',
        y: -5,
      },
      '0.15',
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

  links?.forEach((link) => {
    link.addEventListener('click', () => {
      menuCloseTl.play(0);
      if (link.hash) {
        getLenis()?.scrollTo(link.hash);
      }
    });
  });
}

/** 初期化 */
export function initMenu() {
  registerMenuEvent();
}
