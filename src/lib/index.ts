import { setCssVars } from './setCssVars';
import { initSmooth } from './smooth';
import { initMenu } from './menu';
import { initStoryAnimation } from './story';
import { initFvVisualSlider } from './webgl/SlideEffect';

document.addEventListener('DOMContentLoaded', () => {
  setCssVars();
  initSmooth();
  initStoryAnimation();
  initMenu();
  initFvVisualSlider();
});

const setupSwup = () => {
  if (!window.swup) return;
  window.swup.hooks.on('page:view', () => {
    initFvVisualSlider();
    initMenu();
  });
};
document.addEventListener('swup:enable', setupSwup);
