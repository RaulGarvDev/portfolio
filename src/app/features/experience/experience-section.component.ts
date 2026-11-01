import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { EXPERIENCE, TECH_FILTERS, Tech } from '../../content/portfolio.data';
import { CompanyLogoComponent } from '../../shared/company-logo/company-logo.component';

@Component({
  selector: 'app-experience',
  imports: [CompanyLogoComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './experience-section.component.html',
  styleUrl: './experience-section.component.css',
})
export class ExperienceSectionComponent {
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
