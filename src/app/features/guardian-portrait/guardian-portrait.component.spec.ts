import { ComponentFixture, TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { GuardianPortraitComponent } from './guardian-portrait.component';

describe('GuardianPortraitComponent', () => {
  let fixture: ComponentFixture<GuardianPortraitComponent>;
  let host: HTMLElement;
  let reducedMotion: boolean;
  let motionChangeListener: ((event: MediaQueryListEvent) => void) | undefined;
  let matchMediaDescriptor: PropertyDescriptor | undefined;
  const animationFrames: { id: number; callback: FrameRequestCallback }[] = [];
  let nextAnimationFrameId = 0;

  beforeEach(() => {
    animationFrames.length = 0;
    nextAnimationFrameId = 0;
    reducedMotion = false;
    motionChangeListener = undefined;
    matchMediaDescriptor = Object.getOwnPropertyDescriptor(window, 'matchMedia');
    const motionPreference = {
      get matches() {
        return reducedMotion;
      },
      addEventListener: vi.fn((_type: string, listener: (event: MediaQueryListEvent) => void) => {
        motionChangeListener = listener;
      }),
      removeEventListener: vi.fn(),
    } as unknown as MediaQueryList;
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      value: vi.fn().mockReturnValue(motionPreference),
    });

    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
      const id = ++nextAnimationFrameId;
      animationFrames.push({ id, callback });
      return id;
    });
    vi.spyOn(window, 'cancelAnimationFrame').mockImplementation((id) => {
      const frameIndex = animationFrames.findIndex((frame) => frame.id === id);
      if (frameIndex >= 0) {
        animationFrames.splice(frameIndex, 1);
      }
    });
    TestBed.configureTestingModule({ imports: [GuardianPortraitComponent] });
    fixture = TestBed.createComponent(GuardianPortraitComponent);
    host = fixture.nativeElement;
    fixture.detectChanges();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
    vi.useRealTimers();
    vi.restoreAllMocks();
    if (matchMediaDescriptor) {
      Object.defineProperty(window, 'matchMedia', matchMediaDescriptor);
    } else {
      Reflect.deleteProperty(window, 'matchMedia');
    }
  });

  it('draws one slow V through the lower torso and up across to the opposite side', async () => {
    const initialTip = readBladeTip();
    expect(initialTip.x).toBeCloseTo(392);
    expect(initialTip.y).toBeCloseTo(96);

    dispatchPointer('pointerenter', 'mouse');
    const poses: Pose[] = [];
    const tips: Point[] = [];
    for (let frame = 1; frame <= 120 && animationFrames.length > 0; frame += 1) {
      await advanceFrame(frame * 16);
      poses.push(readPose());
      tips.push(readBladeTip());
    }

    const lowestIndex = tips.reduce((lowest, point, index) => (point.y > tips[lowest].y ? index : lowest), 0);
    const lowestTip = tips[lowestIndex];
    const finalTip = tips.at(-1)!;

    expect(lowestTip.x).toBeCloseTo(305, 0);
    expect(lowestTip.y).toBeCloseTo(315, 0);
    expect(finalTip.x).toBeCloseTo(225, 0);
    expect(finalTip.y).toBeCloseTo(135, 0);
    expect(initialTip.x - lowestTip.x).toBeGreaterThan(70);
    expect(lowestTip.x - finalTip.x).toBeGreaterThan(65);
    expect(lowestTip.y - initialTip.y).toBeGreaterThan(200);
    expect(lowestTip.y - finalTip.y).toBeGreaterThan(160);
    expect(lowestTip.x).toBeLessThan(initialTip.x);
    expect(finalTip.y).toBeLessThan(lowestTip.y);
    expect(poses[lowestIndex].angle).toBeCloseTo(20);
    expect(poses.at(-1)?.angle).toBeCloseTo(-12);
    expect(Math.abs(poses[lowestIndex].x)).toBeLessThan(140);
    expect(poses[lowestIndex].y).toBeLessThan(180);
    expect(tips.every((tip, index) => isSaberInsideSvg(tip, poses[index]))).toBe(true);
    expect(animationFrames).toHaveLength(0);

    for (let frame = 121; frame <= 140; frame += 1) {
      await advanceFrame(frame * 16);
    }
    expect(readBladeTip()).toEqual(finalTip);
    expect(animationFrames).toHaveLength(0);
  });

  it('returns smoothly to the resting pose when the pointer leaves mid-sweep', async () => {
    dispatchPointer('pointerenter', 'mouse');
    for (let frame = 1; frame <= 35; frame += 1) {
      await advanceFrame(frame * 16);
    }

    const poseBeforeExit = readPose();
    expect(poseBeforeExit.angle).toBeGreaterThan(0);
    expect(poseBeforeExit.x).toBeLessThan(0);
    expect(poseBeforeExit.y).toBeGreaterThan(0);
    host.dispatchEvent(new Event('pointerleave'));

    const returnPoses: Pose[] = [];
    const returnSamples: { pose: Pose; tip: Point }[] = [];
    for (let frame = 36; frame <= 100 && animationFrames.length > 0; frame += 1) {
      await advanceFrame(frame * 16);
      returnPoses.push(readPose());
      returnSamples.push({ pose: readPose(), tip: readBladeTip() });
    }

    expect(
      returnPoses.every(
        (pose, index) =>
          index === 0 ||
          (pose.x >= returnPoses[index - 1].x &&
            pose.y <= returnPoses[index - 1].y &&
            pose.angle <= returnPoses[index - 1].angle),
      ),
    ).toBe(true);
    expect(returnSamples.every(({ pose, tip }) => isSaberInsideSvg(tip, pose))).toBe(true);
    expect(readPose()).toEqual({ angle: 0, x: 0, y: 0 });
    expect(animationFrames).toHaveLength(0);
    expect(host.querySelector('.saber-grip')?.classList.contains('pointer-active')).toBe(false);
  });

  it('does not move the saber for touch input', () => {
    dispatchPointer('pointerenter', 'touch');
    fixture.detectChanges();

    expect(readPose()).toEqual({ angle: 0, x: 0, y: 0 });
    expect(animationFrames).toHaveLength(0);
    expect(host.querySelector('.saber-grip')?.classList.contains('pointer-active')).toBe(false);
  });

  it('keeps the saber still when reduced motion is enabled', async () => {
    dispatchPointer('pointerenter', 'mouse');
    for (let frame = 1; frame <= 30; frame += 1) {
      await advanceFrame(frame * 16);
    }
    expect(readPose().x).toBeLessThan(0);

    reducedMotion = true;
    motionChangeListener?.({ matches: true } as MediaQueryListEvent);
    fixture.detectChanges();
    expect(componentAnimationFrame()).toBeUndefined();
    dispatchPointer('pointerenter', 'mouse');

    expect(readPose()).toEqual({ angle: 0, x: 0, y: 0 });
    expect(componentAnimationFrame()).toBeUndefined();
  });

  function dispatchPointer(type: string, pointerType: string): void {
    const event = Object.assign(new Event(type), { pointerType });
    host.dispatchEvent(event);
  }

  async function advanceFrame(timestamp: number): Promise<void> {
    for (const { callback } of animationFrames.splice(0)) {
      callback(timestamp);
    }
    fixture.detectChanges();
    await Promise.resolve();
  }

  function readPose(): Pose {
    const transform = host.querySelector('.saber-grip')?.getAttribute('transform') ?? '';
    const [, x, y, angle] = transform.match(/translate\(([-\d.]+) ([-\d.]+)\) rotate\(([-\d.]+) 280 242\)/) ?? [];
    return { x: Number(x), y: Number(y), angle: Number(angle) };
  }

  function componentAnimationFrame(): number | undefined {
    return (fixture.componentInstance as unknown as { animationFrame?: number }).animationFrame;
  }

  function readBladeTip(): Point {
    const { angle, x: translateX, y: translateY } = readPose();
    const radians = (angle * Math.PI) / 180;
    return {
      x: 280 + 112 * Math.cos(radians) + 146 * Math.sin(radians) + translateX,
      y: 242 + 112 * Math.sin(radians) - 146 * Math.cos(radians) + translateY,
    };
  }

  function isSaberInsideSvg(tip: Point, pose: Pose): boolean {
    const { angle, x: translateX, y: translateY } = pose;
    const radians = (angle * Math.PI) / 180;
    const bladeBase = {
      x: 280 + 9 * Math.cos(radians) + 20 * Math.sin(radians) + translateX,
      y: 242 + 9 * Math.sin(radians) - 20 * Math.cos(radians) + translateY,
    };
    return [tip, bladeBase].every((point) => point.x >= 10 && point.x <= 470 && point.y >= 10 && point.y <= 470);
  }
});

interface Point {
  x: number;
  y: number;
}

interface Pose {
  angle: number;
  x: number;
  y: number;
}
