import Lenis, { type LenisOptions } from 'lenis';

let lenis: Lenis | null = null;

export function initLenis(property: LenisOptions) {
  if (!lenis) {
    lenis = new Lenis(property);
  }
  return lenis;
}

export function getLenis() {
  return lenis;
}
