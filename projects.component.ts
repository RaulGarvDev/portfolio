import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PROJECTS } from './portfolio';

@Component({
  selector: 'app-projects',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h2>Proyectos</h2>
    <div class="projects">
      @for (project of projects; track project.name) {
        <a class="project" [href]="project.url" target="_blank" rel="noopener">
          <strong>{{ project.name }}</strong>
          <span class="muted">{{ project.description }}</span>
          <small>{{ project.tech.join(' · ') }}</small>
        </a>
      }
    </div>
  `,
})
export class Projects {
  protected readonly projects = PROJECTS;
}
