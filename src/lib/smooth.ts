import { initLenis } from './singletons';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const lenis = initLenis({
  prevent: (node) => node.id === 'global-menu',
});

lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  if (!lenis) return;
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);
