import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BooksComponent } from './books.component';
import { httpResource, provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Book } from '../../models/book.model';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { expect } from '@jest/globals';

describe('BooksComponent', () => {
  let component: BooksComponent;
  let fixture: ComponentFixture<BooksComponent>;

  const mockBooks: Book[] = [
    {
      id: 1,
      title: 'Test Book 1',
      author: 'Author 1',
      publication_year: 2020,
      genre: [],
      description: '',
      cover_image: ''
    },
    {
      id: 2,
      title: 'Test Book 2',
      author: 'Author 2',
      publication_year: 2021,
      genre: [],
      description: '',
      cover_image: ''
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BooksComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: httpResource,
          useValue: () => of(mockBooks)
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BooksComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with correct API URL', () => {
    expect(component.apiUrl).toBe('https://www.freetestapi.com/api/v1/books');
  });

  it('should initialize books resource with empty array as default', () => {
    expect(component.books.value()).toBeDefined();
    expect(component.books.value()).toEqual([]);
  });

});
