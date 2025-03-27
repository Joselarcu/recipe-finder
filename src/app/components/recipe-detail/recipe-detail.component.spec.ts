import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { RecipeDetailComponent } from './recipe-detail.component';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { of } from 'rxjs';
import { Recipe } from '../../models/recipe.model';

describe('RecipeDetailComponent', () => {
  let component: RecipeDetailComponent;
  let fixture: ComponentFixture<RecipeDetailComponent>;


  const mockRecipe: Recipe = {
    id: '1',
    title: 'Test Recipe',
    readyInMinutes: 30,
    difficulty: 'Easy',
    ingredients: [
      { name: 'Ingredient 1', quantity: '1', unit: 'cup' },
      { name: 'Ingredient 2', quantity: '2', unit: 'tbsp' }
    ],
    instructions: 'Test instructions',
    imageUrl: 'test.jpg',
    favorite: false
  };

  beforeEach(async () => {
    const recipeServiceSpy = {getRecipeById: () => of(mockRecipe), setFavorite: () => of({})};
    const routeSpy = {
      snapshot: {
        paramMap: {
          get: () => 1
        }
      }
    };

    await TestBed.configureTestingModule({
      providers: [
        { provide: RecipeService, useValue: recipeServiceSpy },
        { provide: ActivatedRoute, useValue: routeSpy }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadRecipe method on ngOnInit', () => {
    const spyLoadRecipe = spyOn(component as any, 'loadRecipe');
    component.ngOnInit();
    expect(spyLoadRecipe).toHaveBeenCalledWith(1);

  });

  it('should load recipe successfully', fakeAsync(() => {
    expect(component.loading).toBeFalse();
    expect(component.error).toBe('');
    expect(component.recipe).toEqual(mockRecipe);
  }));

  it('should unsubscribe on ngOnDestroy', () => {
    const unsubscribeSpy = spyOn(component.subscription, 'unsubscribe');
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });

});
