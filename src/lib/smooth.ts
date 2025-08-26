import { initLenis } from './utils/lenis';
import { easeOutQuart } from './utils/easing';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const lenis = initLenis({
  prevent: (node) => node.id === 'global-menu',
  duration: 1.4,
  easing: easeOutQuart,
});

lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  if (!lenis) return;
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);
