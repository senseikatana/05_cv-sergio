// ==========================================================================
// Main Entry — Resume Sergio
// ==========================================================================

import { switchLang, initI18n } from './i18n.ts';
import { toggleTheme, initTheme } from './theme.ts';
import { showToast } from './ui.ts';
import { initDownloads } from './downloads.ts';
import { initForm } from './form.ts';

// Expose functions to global scope for onclick handlers
declare global {
  interface Window {
    switchLang: typeof switchLang;
    toggleTheme: typeof toggleTheme;
    showToast: typeof showToast;
  }
}

window.switchLang = switchLang;
window.toggleTheme = toggleTheme;
window.showToast = showToast;

document.addEventListener('DOMContentLoaded', () => {
  initI18n();
  initTheme();
  initDownloads();
  initForm();
  initRevealAnimations();
  initDropdownClose();
});

// --- IntersectionObserver for section-fade reveal ---
function initRevealAnimations(): void {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );

  document.querySelectorAll<HTMLElement>('.section-fade').forEach((el) => {
    observer.observe(el);
  });
}

// --- Close dropdowns when clicking outside ---
function initDropdownClose(): void {
  document.addEventListener('click', (e) => {
    if (!(e.target as HTMLElement).closest('.dropdown')) {
      document.querySelectorAll<HTMLElement>('.dropdown-menu').forEach((m) => {
        m.classList.remove('show');
      });
    }
  });
}
