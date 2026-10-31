import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { EXPERIENCE, TECH_FILTERS, Tech } from './portfolio';
import { CompanyLogo } from './company-logo.component';

@Component({
  selector: 'app-experience',
  imports: [CompanyLogo],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h2>Trayectoria</h2>
    <p class="muted">Pulsa una tecnología para ver en qué puestos la he utilizado.</p>

    <div class="chips" role="group" aria-label="Filtrar por tecnología">
      @for (tech of filters; track tech) {
        <button class="chip" type="button" [attr.aria-pressed]="selected() === tech" (click)="toggle(tech)">
          {{ tech }}
        </button>
      }
    </div>
    <p class="muted also">También trabajo con Spring Boot, APIs REST, TypeScript, Maven multimódulo, Oracle y Git.</p>

    <ol class="timeline">
      @for (job of jobs; track job.id) {
        <li [class.now]="job.current" [class.dim]="!matching().has(job.id)">
          <app-logo [file]="job.logo" [initials]="job.initials" />
          <div class="job">
            <span class="when">{{ job.period }}</span>
            <h3>{{ job.role }}</h3>
            <p class="where">{{ job.company }}</p>
            <p>{{ job.summary }}</p>
            @if (job.tags.length) {
              <ul class="tags">
                @for (tag of job.tags; track tag) {
                  <li>{{ tag }}</li>
                }
              </ul>
            }
          </div>
        </li>
      }
    </ol>
  `,
})
export class Experience {
  protected readonly filters = TECH_FILTERS;
  protected readonly jobs = EXPERIENCE;
  protected readonly selected = signal<Tech | null>(null);

  /** Identificadores de los puestos que usan la tecnología seleccionada (todos si no hay filtro). */
  protected readonly matching = computed(() => {
    const tech = this.selected();
    return new Set(this.jobs.filter((job) => !tech || job.tags.includes(tech)).map((job) => job.id));
  });

  protected toggle(tech: Tech): void {
    this.selected.update((current) => (current === tech ? null : tech));
  }
}
