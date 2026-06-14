// ==========================================================================
// Form — Drag & Drop + fetch submission
// ==========================================================================

import { showToast } from './ui.ts';

function updateFileName(name: string): void {
  const display = document.getElementById('fileNameDisplay');
  if (!display) return;
  display.textContent = `📎 ${name}`;
  display.classList.remove('hidden');
}

export function initForm(): void {
  const form = document.getElementById('contactForm') as HTMLFormElement | null;
  const dropzone = document.getElementById('dropzone');
  const fileInput = document.getElementById('fileInput') as HTMLInputElement | null;

  // --- Form submission via fetch ---
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      try {
        const res = await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: { Accept: 'application/json' },
        });
        if (res.ok) {
          form.reset();
          document.getElementById('fileNameDisplay')?.classList.add('hidden');
          showToast('¡Mensaje enviado!');
        } else {
          showToast('Error al enviar. Inténtalo de nuevo.');
        }
      } catch {
        showToast('Error de conexión.');
      }
    });
  }

  if (!dropzone || !fileInput) return;

  // --- Drag & Drop ---
  ['dragenter', 'dragover'].forEach((ev) => {
    dropzone.addEventListener(ev, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropzone.classList.add('active');
    });
  });

  ['dragleave', 'drop'].forEach((ev) => {
    dropzone.addEventListener(ev, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropzone.classList.remove('active');
    });
  });

  dropzone.addEventListener('drop', (e) => {
    const dt = e as DragEvent;
    if (dt.dataTransfer?.files.length) {
      fileInput.files = dt.dataTransfer.files;
      updateFileName(dt.dataTransfer.files[0]!.name);
    }
  });

  dropzone.addEventListener('click', () => fileInput.click());

  fileInput.addEventListener('change', () => {
    if (fileInput.files?.length) updateFileName(fileInput.files[0]!.name);
  });
}
