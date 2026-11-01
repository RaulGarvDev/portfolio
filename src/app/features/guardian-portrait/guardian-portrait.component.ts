import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';

interface SaberPose {
  angle: number;
  x: number;
  y: number;
}

@Component({
  selector: 'app-guardian-portrait',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(pointerenter)': 'startSaberGesture($event)',
    '(pointerleave)': 'returnSaberToRest()',
  },
  templateUrl: './guardian-portrait.component.html',
  styleUrl: './guardian-portrait.component.css',
})
export class GuardianPortraitComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly reducedMotion = inject(DOCUMENT).defaultView?.matchMedia?.('(prefers-reduced-motion: reduce)');
  private readonly dipPose: SaberPose = { angle: 20, x: -130, y: 172 };
  private readonly farSidePose: SaberPose = { angle: -12, x: -134, y: 59 };
  private readonly dipDuration = 720;
  private readonly crossDuration = 900;
  private readonly returnDuration = 700;
  private motion: 'gesture' | 'return' | undefined;
  private motionElapsed = 0;
  private motionStartPose: SaberPose = { angle: 0, x: 0, y: 0 };
  private lastFrameTime = 0;
  private animationFrame: number | undefined;
  private readonly onMotionPreferenceChange = (event: MediaQueryListEvent): void => {
    if (!event.matches) {
      return;
    }

    this.stopSaberAnimation();
    this.pointerInside.set(false);
    this.saberPose.set({ angle: 0, x: 0, y: 0 });
  };

  protected readonly saberPose = signal<SaberPose>({ angle: 0, x: 0, y: 0 });
  protected readonly pointerInside = signal(false);

  constructor() {
    this.reducedMotion?.addEventListener('change', this.onMotionPreferenceChange);
    this.destroyRef.onDestroy(() => {
      this.stopSaberAnimation();
      this.reducedMotion?.removeEventListener('change', this.onMotionPreferenceChange);
    });
  }

  protected startSaberGesture(event: PointerEvent): void {
    if (event.pointerType !== 'mouse') {
      return;
    }

    this.pointerInside.set(true);

    if (this.reducedMotion?.matches) {
      this.stopSaberAnimation();
      this.saberPose.set({ angle: 0, x: 0, y: 0 });
      return;
    }

    this.stopSaberAnimation();
    this.motion = 'gesture';
    this.motionStartPose = this.saberPose();
    this.startSaberAnimation();
  }

  protected returnSaberToRest(): void {
    this.pointerInside.set(false);
    const pose = this.saberPose();

    if (this.reducedMotion?.matches) {
      this.stopSaberAnimation();
      this.saberPose.set({ angle: 0, x: 0, y: 0 });
      return;
    }

    if (pose.angle === 0 && pose.x === 0 && pose.y === 0 && this.animationFrame === undefined) {
      return;
    }

    this.stopSaberAnimation();
    this.motion = 'return';
    this.motionStartPose = pose;
    this.startSaberAnimation();
  }

  private readonly animateSaber = (timestamp: number): void => {
    const elapsed = this.lastFrameTime ? Math.min(timestamp - this.lastFrameTime, 32) : 0;
    this.lastFrameTime = timestamp;
    this.motionElapsed += elapsed;

    if (this.motion === 'gesture') {
      if (this.motionElapsed < this.dipDuration) {
        const progress = this.easeInOut(this.motionElapsed / this.dipDuration);
        this.saberPose.set(this.interpolatePose(this.motionStartPose, this.dipPose, progress));
      } else if (this.motionElapsed < this.dipDuration + this.crossDuration) {
        const progress = this.easeInOut((this.motionElapsed - this.dipDuration) / this.crossDuration);
        this.saberPose.set(this.interpolatePose(this.dipPose, this.farSidePose, progress));
      } else {
        this.saberPose.set(this.farSidePose);
        this.finishSaberAnimation();
        return;
      }
    } else if (this.motion === 'return') {
      const progress = Math.min(this.motionElapsed / this.returnDuration, 1);
      this.saberPose.set(this.interpolatePose(this.motionStartPose, { angle: 0, x: 0, y: 0 }, this.easeInOut(progress)));
      if (progress === 1) {
        this.saberPose.set({ angle: 0, x: 0, y: 0 });
        this.finishSaberAnimation();
        return;
      }
    } else {
      this.finishSaberAnimation();
      return;
    }

    this.animationFrame = requestAnimationFrame(this.animateSaber);
  };

  private startSaberAnimation(): void {
    if (this.animationFrame === undefined) {
      this.motionElapsed = 0;
      this.lastFrameTime = 0;
      this.animationFrame = requestAnimationFrame(this.animateSaber);
    }
  }

  private finishSaberAnimation(): void {
    this.motion = undefined;
    this.motionElapsed = 0;
    this.lastFrameTime = 0;
    this.animationFrame = undefined;
  }

  private stopSaberAnimation(): void {
    if (this.animationFrame !== undefined) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = undefined;
    }

    this.motion = undefined;
    this.motionElapsed = 0;
    this.lastFrameTime = 0;
  }

  private interpolatePose(start: SaberPose, end: SaberPose, progress: number): SaberPose {
    return {
      angle: this.lerp(start.angle, end.angle, progress),
      x: this.lerp(start.x, end.x, progress),
      y: this.lerp(start.y, end.y, progress),
    };
  }

  private easeInOut(progress: number): number {
    return progress * progress * (3 - 2 * progress);
  }

  private lerp(start: number, end: number, progress: number): number {
    return start + (end - start) * progress;
  }
}
