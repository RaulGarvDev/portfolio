import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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
})
export class AppComponent {
  protected readonly theme = inject(ThemeService);
  protected readonly contact = CONTACT;
  protected readonly current = EXPERIENCE.find((job) => job.current);
  protected readonly hasProjects = PROJECTS.length > 0;
  protected readonly year = new Date().getFullYear();
}
