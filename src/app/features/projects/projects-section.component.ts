import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PROJECTS } from '../../content/portfolio.data';

@Component({
  selector: 'app-projects',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './projects-section.component.html',
})
export class ProjectsSectionComponent {
  protected readonly projects = PROJECTS;
}
