import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecipeDetailComponent } from './recipe-detail.component';
import { RecipeService } from '../../services/recipe.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Recipe } from '../../models/recipe.model';

describe('RecipeDetailComponent', () => {
  let component: RecipeDetailComponent;
  let fixture: ComponentFixture<RecipeDetailComponent>;
  let recipeServiceStub: jest.Mocked<RecipeService>;
  let mockRecipe: Recipe;

  const mockActivatedRoute = {
    snapshot: {
      paramMap: {
        get: () => '1'
      }
    }
  };

  beforeEach(async () => {
    mockRecipe = {
      id: '1',
      title: 'Test Recipe',
      readyInMinutes: 30,
      instructions: 'Test instructions',
      favorite: false,
      ingredients: [],
      difficulty: 'easy',
      imageUrl: 'test.jpg',
      keywords: ['test']
    };

    recipeServiceStub = {
      getRecipeById: () =>of(mockRecipe),
      setFavorite: () => of(void 0)
    } as any;

    await TestBed.configureTestingModule({
      imports: [RecipeDetailComponent],
      providers: [
        { provide: RecipeService, useValue: recipeServiceStub },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RecipeDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with loading state', () => {
    jest.spyOn(component['recipeService'], 'getRecipeById').mockReturnValue(of(null));

    fixture.detectChanges();

    expect(component.loading()).toBe(false);
    expect(component.error()).toBe('');
  });

  it('should load recipe successfully', () => {
    fixture.detectChanges();

    expect(component.loading()).toBe(false);
    expect(component.error()).toBe('');
    expect(component.recipe()).toEqual(mockRecipe);
  });

  // it('should handle error state', () => {
  //   const subject = new BehaviorSubject<Recipe | null>({} as any);

  //   const recipeServiceStubNew = {
  //     getRecipeById: () => subject,
  //     setFavorite: jest.fn()
  //   } as any;

  //   subject.next(null);
  //   fixture.detectChanges();

  //   expect(component.loading()).toBe(false);
  //   expect(component.error()).toBe('Error loading recipe details. Please try again.');
  //   expect(component.recipe()).toBeNull();
  // });

  it('should toggle favorite successfully', () => {
    const setFavoriteSpy = jest.spyOn(recipeServiceStub, 'setFavorite');

    fixture.detectChanges();
    component.toggleFavorite();

    expect(setFavoriteSpy).toHaveBeenCalledWith('1', true);
  });

  it('should not toggle favorite if recipe is null', () => {
  
    const setFavoriteSpy = jest.spyOn(recipeServiceStub, 'setFavorite');
    jest.spyOn(component, 'recipe').mockReturnValue(null);

    fixture.detectChanges();
    component.toggleFavorite();

    expect(setFavoriteSpy).not.toHaveBeenCalled();
  });

  it('should handle error when toggling favorite', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    const setFavoriteSpy = jest.spyOn(recipeServiceStub, 'setFavorite').mockReturnValue(throwError(() => new Error('Error toggling favorite')));

    fixture.detectChanges();
    component.toggleFavorite();

    expect(setFavoriteSpy).toHaveBeenCalledWith('1', true);
    expect(consoleSpy).toHaveBeenCalledWith('Error toggling favorite:', expect.any(Error));
    consoleSpy.mockRestore();
  });
});
