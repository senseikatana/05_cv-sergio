// ==========================================================================
// Theme — Dark / Light mode switching
// ==========================================================================

const moonPath = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>';
const sunPath  = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>';

function applyTheme(mode: 'light' | 'dark'): void {
  const html = document.documentElement;
  html.className = mode;

  // Intercambiar el path del SVG según el modo
  const icon = document.getElementById('themeIcon');
  if (icon) icon.innerHTML = mode === 'dark' ? sunPath : moonPath;

  try { localStorage.setItem('theme', mode); } catch { /* no-op */ }
}

export function toggleTheme(): void {
  const current = document.documentElement.className;
  applyTheme(current === 'light' ? 'dark' : 'light');
}

export function initTheme(): void {
  try {
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (saved) applyTheme(saved);
  } catch { /* no-op */ }
}
