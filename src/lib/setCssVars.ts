export function setCssVars(): void {
  const root = document.documentElement;

  // --vh 計算
  const vh = window.innerHeight;
  root.style.setProperty('--vh', `${vh}px`);
}
