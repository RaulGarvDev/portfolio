import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-guardian-portrait',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    tabindex: '0',
    'aria-label': 'Ilustración de Raúl como guardián espacial',
  },
  templateUrl: './guardian-portrait.component.html',
  styles: [
    `
      :host {
        display: block;
      }

      .saber-grip {
        transform-box: view-box;
        transform-origin: 280px 242px;
      }

      :host(:hover) .saber-grip,
      :host(:active) .saber-grip,
      :host(:focus-visible) .saber-grip {
        animation: saber-swing 900ms ease-in-out infinite alternate;
      }

      @keyframes saber-swing {
        from {
          transform: rotate(-8deg);
        }
        to {
          transform: rotate(8deg);
        }
      }

      @media (prefers-reduced-motion: reduce) {
        :host(:hover) .saber-grip,
        :host(:active) .saber-grip,
        :host(:focus-visible) .saber-grip {
          animation: none;
          transform: none;
        }
      }
    `,
  ],
})
export class GuardianPortraitComponent {}
