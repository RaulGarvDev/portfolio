import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { JavaCatComponent } from './java-cat.component';

describe('JavaCatComponent', () => {
  let fixture: ComponentFixture<JavaCatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [JavaCatComponent] });
    fixture = TestBed.createComponent(JavaCatComponent);
    fixture.detectChanges();
  });

  it('says “Derrotaremos a todos los bug” as part of its phrase rotation', () => {
    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    const bubble = fixture.nativeElement.querySelector('.bubble') as HTMLElement;

    button.click();
    button.click();
    button.click();
    button.click();
    fixture.detectChanges();

    expect(bubble.textContent?.trim()).toBe('Derrotaremos a todos los bug');
    expect(bubble.classList.contains('show')).toBe(true);
  });
});
