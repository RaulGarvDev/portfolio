import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let playSpy: ReturnType<typeof vi.spyOn>;
  let pauseSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    playSpy = vi
      .spyOn(HTMLMediaElement.prototype, 'play')
      .mockRejectedValue(new DOMException('Playback prevented', 'NotAllowedError'));
    playSpy.mockClear();
    pauseSpy = vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => undefined);
    TestBed.configureTestingModule({ imports: [AppComponent] });
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
  });

  it('attempts autoplay and explains when the browser blocks it', async () => {
    await fixture.whenStable();
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('.ambience-toggle') as HTMLButtonElement;
    expect(button.getAttribute('aria-pressed')).toBe('false');
    expect(playSpy).toHaveBeenCalledOnce();
    expect(fixture.nativeElement.querySelector('.ambience-status').textContent).toContain(
      'El navegador bloqueó la reproducción automática.',
    );
  });

  it('plays and pauses the selected track from the manual control', async () => {
    await fixture.whenStable();
    playSpy.mockClear();
    playSpy.mockResolvedValue();
    const button = fixture.nativeElement.querySelector('.ambience-toggle') as HTMLButtonElement;

    button.click();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(playSpy).toHaveBeenCalledOnce();
    expect(button.getAttribute('aria-pressed')).toBe('true');
    expect(button.textContent).toContain('Pausar música');

    button.click();
    fixture.detectChanges();
    expect(pauseSpy).toHaveBeenCalled();
    expect(button.getAttribute('aria-pressed')).toBe('false');
    expect(button.textContent).toContain('Reproducir música');
  });

  it('hides the decorative fleet from assistive technology', () => {
    expect(fixture.nativeElement.querySelector('.fleet-art').getAttribute('aria-hidden')).toBe('true');
  });

  it('uses the selected local song', () => {
    const audio = fixture.nativeElement.querySelector('audio') as HTMLAudioElement;
    expect(audio.loop).toBe(true);
    expect(audio.querySelector('source')?.getAttribute('src')).toBe(
      '/assets/audio/luis_humanoide-star-wars-style-chase-music-181118.wav',
    );
  });
});
