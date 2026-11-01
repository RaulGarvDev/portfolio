import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  const values = new Map<string, string>();
  const storage = {
    clear: () => values.clear(),
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => values.set(key, String(value)),
  };

  beforeEach(() => {
    values.clear();
    vi.stubGlobal('localStorage', storage);
    TestBed.configureTestingModule({});
  });

  afterEach(() => {
    TestBed.resetTestingModule();
    vi.unstubAllGlobals();
    values.clear();
  });

  it('restores the saved theme and exposes the next action', () => {
    localStorage.setItem('theme', 'dark');

    const service = TestBed.inject(ThemeService);

    expect(service.theme()).toBe('dark');
    expect(service.nextLabel()).toBe('Tema claro');
  });

  it('toggles the theme and persists the new value', () => {
    localStorage.setItem('theme', 'light');
    const service = TestBed.inject(ThemeService);

    service.toggle();

    expect(service.theme()).toBe('dark');
    expect(service.nextLabel()).toBe('Tema claro');
    expect(storage.getItem('theme')).toBe('dark');
  });
});
