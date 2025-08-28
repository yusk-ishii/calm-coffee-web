import { setCssVars } from './setCssVars';
import { initSmooth } from './smooth';
import { initMenu } from './menu';
import { initStoryAnimation } from './story';
import { initFirstVisualSlider } from './webgl/FirstVisualSlider';

document.addEventListener('DOMContentLoaded', () => {
  setCssVars();
  initSmooth();
  initStoryAnimation();
  initMenu();
  initFirstVisualSlider();
});

const setupSwup = () => {
  if (!window.swup) return;
  window.swup.hooks.on('page:view', () => {
    initFirstVisualSlider();
    initMenu();
  });
};
document.addEventListener('swup:enable', setupSwup);
