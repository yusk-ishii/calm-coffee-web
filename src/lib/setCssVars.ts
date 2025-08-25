function debounce<T extends (...args: unknown[]) => void>(func: T, wait: number): T {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  return function (...args: Parameters<T>) {
    if (timeoutId !== undefined) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), wait);
  } as T;
}

export function setCssVars(): void {
  const root = document.documentElement;

  // --vh 計算
  const vh = window.innerHeight * 0.01;
  root.style.setProperty('--vh', `${vh}`);
}

// 初回実行
setCssVars();

// リサイズ時に debounced 実行
window.addEventListener('resize', debounce(setCssVars, 100));
