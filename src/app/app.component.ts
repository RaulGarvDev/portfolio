import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
import { ThemeService } from './core/theme/theme.service';
import { CONTACT, EXPERIENCE, PROJECTS } from './content/portfolio.data';
import { ExperienceSectionComponent } from './features/experience/experience-section.component';
import { JavaCatComponent } from './features/java-cat/java-cat.component';
import { GuardianPortraitComponent } from './features/guardian-portrait/guardian-portrait.component';
import { ProjectsSectionComponent } from './features/projects/projects-section.component';
import { CompanyLogoComponent } from './shared/company-logo/company-logo.component';

@Component({
  selector: 'app-root',
  imports: [CompanyLogoComponent, JavaCatComponent, GuardianPortraitComponent, ExperienceSectionComponent, ProjectsSectionComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements AfterViewInit {
  @ViewChild('ambienceAudio') private ambienceAudio?: ElementRef<HTMLAudioElement>;

  protected readonly theme = inject(ThemeService);
  private readonly destroyRef = inject(DestroyRef);
  protected readonly contact = CONTACT;
  protected readonly current = EXPERIENCE.find((job) => job.current);
  protected readonly hasProjects = PROJECTS.length > 0;
  protected readonly year = new Date().getFullYear();
  protected readonly ambienceEnabled = signal(false);
  protected readonly ambienceStarting = signal(false);
  protected readonly ambienceStatus = signal('');

  constructor() {
    this.destroyRef.onDestroy(() => this.stopAmbience());
  }

  ngAfterViewInit(): void {
    void this.startAmbience(true);
  }

  protected async toggleAmbience(): Promise<void> {
    if (this.ambienceStarting()) return;

    if (this.ambienceEnabled()) {
      this.pauseAmbience();
      return;
    }

    await this.startAmbience(false);
  }

  private async startAmbience(automatic: boolean): Promise<void> {
    if (this.ambienceStarting() || this.ambienceEnabled()) return;

    const audio = this.ambienceAudio?.nativeElement;
    if (!audio) {
      this.ambienceStatus.set('La música no está disponible. Puedes continuar sin sonido.');
      return;
    }

    this.ambienceStarting.set(true);
    try {
      audio.volume = 0.3;
      await audio.play();

      this.ambienceEnabled.set(true);
      this.ambienceStatus.set(
        automatic
          ? 'La música está sonando. Pulsa para pausarla.'
          : 'La música está sonando.',
      );
    } catch (error) {
      if (error instanceof DOMException && error.name === 'NotAllowedError') {
        this.ambienceStatus.set(
          automatic
            ? 'El navegador bloqueó la reproducción automática. Pulsa para reproducir la música.'
            : 'El navegador impidió la reproducción. Revisa los permisos de audio del sitio.',
        );
      } else {
        console.error('No se pudo reproducir la pista musical.', error);
        this.ambienceStatus.set('No se pudo reproducir la música. Comprueba la conexión e inténtalo de nuevo.');
      }
    } finally {
      this.ambienceStarting.set(false);
    }
  }

  private pauseAmbience(): void {
    const audio = this.ambienceAudio?.nativeElement;
    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;
    this.ambienceEnabled.set(false);
    this.ambienceStatus.set('Música pausada.');
  }

  private stopAmbience(): void {
    const audio = this.ambienceAudio?.nativeElement;
    audio?.pause();
    if (audio) audio.currentTime = 0;
    this.ambienceEnabled.set(false);
  }
}
