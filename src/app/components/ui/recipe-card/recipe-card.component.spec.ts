import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecipeCardComponent } from './recipe-card.component';
import { RecipeService } from '../../../services/recipe.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { of, throwError } from 'rxjs';
import { expect, jest, describe, it, beforeEach } from '@jest/globals';
import { EventEmitter } from '@angular/core';

describe('RecipeCardComponent', () => {
  let component: RecipeCardComponent;
  let fixture: ComponentFixture<RecipeCardComponent>;
  let recipeService: jest.Mocked<RecipeService>;

  const mockRecipe = {
    id: '1',
    title: 'Test Recipe',
    readyInMinutes: 30,
    instructions: 'Test instructions',
    favorite: false,
    ingredients: [{ name: 'Ingredient 1', quantity: '1', unit: 'unit' }],
    difficulty: 'easy',
    imageUrl: 'test1.jpg',
    keywords: ['test', 'recipe', '1', 'ingredient']
  };

  const activatedRouteStub = {
    snapshot: { params: { id: '1' } }
  };

  beforeEach(async () => {
    recipeService = {
      setFavorite: jest.fn()
    } as any;

    await TestBed.configureTestingModule({
      imports: [RecipeCardComponent, RouterModule],
      providers: [
        { provide: RecipeService, useValue: recipeService },
        { provide: ActivatedRoute, useValue: activatedRouteStub }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RecipeCardComponent);
    component = fixture.componentInstance;
    component.recipe = mockRecipe;
    component.reloadRecipes = new EventEmitter<void>();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  describe('toggleFromFavorites', () => {
    it('should toggle favorite status and emit reload event when successful', () => {
      const reloadRecipesEmitSpy = jest.spyOn(component.reloadRecipes, 'emit');
      jest.spyOn(recipeService, 'setFavorite').mockReturnValue(of({favorite: false} as any));

      component.toggleFromFavorites();

      expect(reloadRecipesEmitSpy).toHaveBeenCalled();
      expect(component.recipe.favorite).toBe(true);
    });

    it('should handle error when toggling favorite status', () => {
      const consoleSpy = jest.spyOn(console, 'error');
      recipeService.setFavorite.mockReturnValue(throwError(() => new Error('Test error')));

      component.toggleFromFavorites();
      expect(consoleSpy).toHaveBeenCalledWith('Error toggling favorite. Please try again, Error: Test error');
    });
  });
});
