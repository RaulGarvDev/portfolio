import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ThemeService } from './theme.service';
import { CONTACT, EXPERIENCE, PROJECTS } from './portfolio';
import { Experience } from './experience.component';
import { JavaCat } from './java-cat.component';
import { Projects } from './projects.component';
import { CompanyLogo } from './company-logo.component';

@Component({
  selector: 'app-root',
  imports: [CompanyLogo, JavaCat, Experience, Projects],
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
