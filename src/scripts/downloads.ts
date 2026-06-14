// ==========================================================================
// Downloads — Dynamic Blob files for download links
// ==========================================================================

import { showToast } from './ui.ts';

export function initDownloads(): void {
  document.querySelectorAll<HTMLAnchorElement>('.dynamic-download').forEach((link) => {
    const filename = link.getAttribute('data-filename');
    const content = link.getAttribute('data-content');
    if (!filename || !content) return;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    link.href = url;
    link.download = filename;

    link.addEventListener('click', () => showToast(`Downloading ${filename}...`));
  });
}
