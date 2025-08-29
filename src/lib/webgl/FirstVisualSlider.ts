import { SlideEffect } from './SlideEffect';
import fv01 from '@assets/fv_01.jpg';
import fv02 from '@assets/fv_02.jpg';
import fv03 from '@assets/fv_03.jpg';
import fv04 from '@assets/fv_04.jpg';
import displacement from '@assets/displacement.jpg';

export function initFirstVisualSlider() {
  const fvVisualSlider = document.getElementById('fv-visual-slider') as HTMLCanvasElement | null;

  if (!fvVisualSlider) return;
  new SlideEffect(fvVisualSlider, {
    images: [fv01.src, fv02.src, fv03.src, fv04.src],
    displacementPath: displacement.src,
    intensity: 0.14,
    duration: 6500,
    loopInterval: 5000,
    easing: 'sine.out',
  });
}
