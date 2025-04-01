import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoritesComponent } from './favorites.component';
import { RecipeService } from '../../services/recipe.service';
import { of } from 'rxjs';
import { Recipe } from '../../models/recipe.model';
import { provideRouter } from '@angular/router';

describe('FavoritesComponent', () => {
  let component: FavoritesComponent;
  let fixture: ComponentFixture<FavoritesComponent>;
  let mockRecipes: Recipe[]  = [
    {
      id: '1',
      title: 'Test Recipe 1',
      readyInMinutes: 30,
      instructions: 'Test instructions 1',
      favorite: true,
      ingredients: [],
      difficulty: 'easy',
      imageUrl: 'test1.jpg'
    },
    {
      id: '2',
      title: 'Test Recipe 2',
      readyInMinutes: 45,
      instructions: 'Test instructions 2',
      favorite: true,
      ingredients: [],
      difficulty: 'medium',
      imageUrl: 'test2.jpg'
    }
  ];;

  const recipeServiceStub = {
    getFavoriteRecipes: () => of(mockRecipes)
  };

  beforeEach(async () => {
    
    await TestBed.configureTestingModule({
      imports: [FavoritesComponent],
      providers: [
        { provide: RecipeService, useValue: recipeServiceStub },
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load favorite recipes successfully', () => {
    expect(component.loading()).toBe(false);
    expect(component.recipes()).toEqual(mockRecipes);
  });

});
