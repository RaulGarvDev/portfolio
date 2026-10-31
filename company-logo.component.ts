import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';

/** Logotipo de empresa; si el archivo no existe, muestra las iniciales. */
@Component({
  selector: 'app-logo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'logo' },
  template: `
    @if (url(); as src) {
      <img [src]="src" alt="" (error)="failed.set(true)" />
    } @else {
      <b>{{ initials() }}</b>
    }
  `,
})
export class CompanyLogo {
  readonly file = input<string>();
  readonly initials = input.required<string>();

  protected readonly failed = signal(false);
  protected readonly url = computed(() => {
    const file = this.file();
    return file && !this.failed() ? `assets/logos/${file}` : null;
  });
}
