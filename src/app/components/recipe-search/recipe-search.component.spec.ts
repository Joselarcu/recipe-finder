import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecipeSearchComponent } from './recipe-search.component';
import { of, throwError } from 'rxjs';
import { RecipeService } from '../../services/recipe.service';
import { expect, jest, describe, it, beforeEach } from '@jest/globals';
import { Recipe } from '../../models/recipe.model';
import { ActivatedRoute } from '@angular/router';

const mockRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Test Recipe 1',
    readyInMinutes: 30,
    instructions: 'Test instructions 1',
    favorite: false,
    ingredients: [{ name: 'Ingredient 1', quantity: '1', unit: 'unit' }],
    difficulty: 'easy',
    imageUrl: 'test1.jpg',
    keywords: ['test', 'recipe', '1']
  },
  {
    id: '2',
    title: 'Test Recipe 2',
    readyInMinutes: 45,
    instructions: 'Test instructions 2',
    favorite: true,
    ingredients: [{ name: 'Ingredient 2', quantity: '2', unit: 'unit' }],
    difficulty: 'medium',
    imageUrl: 'test2.jpg',
    keywords: ['test', 'recipe', '2']
  }
];

const activatedRouteStub = {
  snapshot: { params: { id: '1' } }
};

describe('RecipeSearchComponent', () => {
  let component: RecipeSearchComponent;
  let fixture: ComponentFixture<RecipeSearchComponent>;
  let recipeService: jest.Mocked<RecipeService>;

  beforeEach(async () => {
    recipeService = {
      getAllRecipes: jest.fn(),
      searchRecipes: jest.fn()
    } as any;

    await TestBed.configureTestingModule({
      imports: [RecipeSearchComponent],
      providers: [
        { provide: RecipeService, useValue: recipeService },
        { provide: ActivatedRoute, useValue: activatedRouteStub }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RecipeSearchComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('initialization', () => {
    it('should load all recipes on init', () => {
      recipeService.getAllRecipes.mockReturnValue(of(mockRecipes));
      fixture.detectChanges();

      expect(recipeService.getAllRecipes).toHaveBeenCalled();
      expect(component.recipes).toEqual(mockRecipes);
      expect(component.loading).toBe(false);
      expect(component.error).toBe('');
    });

    it('should handle error when loading all recipes fails', () => {
      const errorMessage = 'Failed to load recipes';
      recipeService.getAllRecipes.mockReturnValue(throwError(() => new Error(errorMessage)));
      fixture.detectChanges();

      expect(recipeService.getAllRecipes).toHaveBeenCalled();
      expect(component.recipes).toEqual([]);
      expect(component.loading).toBe(false);
      expect(component.error).toContain(errorMessage);
    });
  });

  describe('search functionality', () => {
    beforeEach(() => {
      recipeService.getAllRecipes.mockReturnValue(of(mockRecipes));
      recipeService.searchRecipes.mockReturnValue(of([mockRecipes[0]]));
      fixture.detectChanges();
    });

    it('should search recipes when input changes', () => {
      const searchEvent = { target: { value: 'test' } } as unknown as Event;
      const searchSubjectNextSpy = jest.spyOn(component['searchSubject'], 'next');
      component.searchRecipes(searchEvent);

      expect(component.loading).toBe(true);
      expect(searchSubjectNextSpy).toHaveBeenCalledWith('test');
    });

    it('should handle empty search query by loading all recipes', () => {
      const searchEvent = { target: { value: '' } } as unknown as Event;
      component.searchRecipes(searchEvent);

      expect(component.loading).toBe(true);
      expect(recipeService.getAllRecipes).toHaveBeenCalled();
    });

    it('should handle search error', () => {
      const errorMessage = 'Search failed';
      component['searchSubject'].error(new Error(errorMessage));
      component['setupSearch']();
      expect(component.loading).toBe(false);
      expect(component.error).toContain(errorMessage);
    });


    it('should debounce search input', (done) => {
      const searchEvent = { target: { value: 'test' } } as unknown as Event;
      component.searchRecipes(searchEvent);
      
      // Initial state
      expect(component.loading).toBe(true);
      
      // Wait for debounce time (300ms)
      setTimeout(() => {
        expect(recipeService.searchRecipes).toHaveBeenCalledWith(['test']);
        expect(component.loading).toBe(false);
        done();
      }, 350);
    });
  });

  describe('cleanup', () => {
    it('should unsubscribe from subscriptions on destroy', () => {
      const subscriptionSpy = jest.spyOn(component['subscription'], 'unsubscribe');
      
      component.ngOnDestroy();
      
      expect(subscriptionSpy).toHaveBeenCalled();
    });
  });
});
