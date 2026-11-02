import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, computed, effect, inject, signal } from '@angular/core';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  readonly theme = signal<Theme>(this.initialTheme());
  /** Texto del botón: indica a qué tema se cambiará. */
  readonly nextLabel = computed(() => (this.theme() === 'dark' ? 'Tema claro' : 'Tema oscuro'));

  constructor() {
    effect(() => {
      const root = this.document.documentElement;
      const dataset = root?.dataset;
      if (dataset) dataset['theme'] = this.theme();
    });
  }

  toggle(): void {
    this.theme.update((current) => (current === 'dark' ? 'light' : 'dark'));
    if (!this.isBrowser) return;

    try {
      localStorage.setItem(STORAGE_KEY, this.theme());
    } catch {
      /* almacenamiento no disponible: el tema solo dura la sesión */
    }
  }

  private initialTheme(): Theme {
    if (this.isBrowser) {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved === 'light' || saved === 'dark') return saved;
      } catch {
        /* sin almacenamiento */
      }
    }
    const prefersDark = this.document.defaultView?.matchMedia?.('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  }
}
