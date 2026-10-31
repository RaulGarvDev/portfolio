import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, inject, signal, viewChild } from '@angular/core';

/** Java, la gata: sus ojos siguen al puntero y responde al pulsarla. */
@Component({
  selector: 'app-java-cat',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(document:pointermove)': 'lookAt($event)' },
  template: `
    <button
      #cat
      class="peek"
      type="button"
      aria-label="Acariciar a Java, mi gata"
      [style.--dx]="dx()"
      [style.--dy]="dy()"
      (click)="pet()"
    >
      <svg viewBox="0 0 120 108" aria-hidden="true">
        <path class="fur" d="M24 47 30 6 54 34ZM96 47 90 6 66 34Z" />
        <circle class="fur" cx="60" cy="62" r="41" />
        <g transform="translate(44 53)"><circle class="iris" r="8" /><ellipse class="pupil" rx="2.6" ry="6" /></g>
        <g transform="translate(76 53)"><circle class="iris" r="8" /><ellipse class="pupil" rx="2.6" ry="6" /></g>
        <path class="nose" d="M56 65h8l-4 5Z" />
        <path class="whiskers" d="M30 66 8 62M30 72 8 74M90 66l22-4M90 72l22 2" />
        <path class="collar" d="M23 78 Q60 90 97 78 L93 94 Q60 105 27 94Z" />
        <path class="collar-edge" d="M25 81 Q60 92 95 81" />
        <text class="collar-name" x="60" y="92" text-anchor="middle">JAVA</text>
      </svg>
    </button>
    <span class="bubble" role="status" [class.show]="visible()">{{ text() }}</span>
  `,
})
export class JavaCat {
  private readonly cat = viewChild.required<ElementRef<HTMLElement>>('cat');
  private readonly lines = ['¡Miau, comandante!', 'Prrr…', 'Java, lista para la misión.'];
  private clicks = 0;
  private timer: ReturnType<typeof setTimeout> | undefined;

  protected readonly dx = signal(0);
  protected readonly dy = signal(0);
  protected readonly text = signal('');
  protected readonly visible = signal(false);

  constructor() {
    inject(DestroyRef).onDestroy(() => clearTimeout(this.timer));
  }

  protected lookAt(event: PointerEvent): void {
    const { left, top, width, height } = this.cat().nativeElement.getBoundingClientRect();
    const x = event.clientX - (left + width / 2);
    const y = event.clientY - (top + height * 0.7);
    const distance = Math.hypot(x, y) || 1;
    this.dx.set((x / distance) * 3);
    this.dy.set((y / distance) * 2.5);
  }

  protected pet(): void {
    this.text.set(this.lines[this.clicks++ % this.lines.length]);
    this.visible.set(true);
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.visible.set(false), 2200);
  }
}
