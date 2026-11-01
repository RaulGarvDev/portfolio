import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, inject, signal, viewChild } from '@angular/core';

/** Java, la gata: sus ojos siguen al puntero y responde al pulsarla. */
@Component({
  selector: 'app-java-cat',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(document:pointermove)': 'lookAt($event)' },
  templateUrl: './java-cat.component.html',
})
export class JavaCatComponent {
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
