import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookInputComponent } from './book-input.component';
import { expect } from '@jest/globals';

describe('BookInputComponent', () => {
  let component: BookInputComponent;
  let fixture: ComponentFixture<BookInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookInputComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(BookInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty book title', () => {
    expect(component.bookTitle()).toBe('');
  });

  it('should update book title on input', () => {
    const testValue = 'Test Book Title';
    const mockEvent = {
      target: {
        value: testValue
      }
    } as Event;

    component.onInput(mockEvent);
    expect(component.bookTitle()).toBe(testValue);
  });

  it('should handle empty input', () => {
    const mockEvent = {
      target: {
        value: ''
      }
    } as Event;

    component.onInput(mockEvent);
    expect(component.bookTitle()).toBe('');
  });
});
