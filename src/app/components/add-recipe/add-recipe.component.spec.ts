import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { AddRecipeComponent } from './add-recipe.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipeService } from '../../services/recipe.service';
import { Router } from '@angular/router';
import { Injector } from '@angular/core';
import { of } from 'rxjs';

describe('AddRecipeComponent', () => {
  let component: AddRecipeComponent;
  let fixture: ComponentFixture<AddRecipeComponent>;

  const mockRecipeService = {
    addRecipe: () => of(12)
  };

  const mockRouter = {
    navigate: jest.fn()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddRecipeComponent, ReactiveFormsModule],
      providers: [
        { provide: RecipeService, useValue: mockRecipeService },
        { provide: Router, useValue: mockRouter },
        Injector
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values', () => {
    expect(component.recipeForm.value).toEqual({
      title: '',
      readyInMinutes: 0,
      ingredients: [{name: '', quantity: '', unit: ''}],
      instructions: '',
      difficulty: '',
      imageUrl: '',
      favorite: false
    });

    expect(component['errorSignal']()).toEqual('');
  });

  it('should get ingredients', () => {
    expect(component.ingredients.length).toEqual(1);
  });

  it('should add ingredient', () => {
    component.addIngredient();
    expect(component.ingredients.length).toEqual(2);
  });

  it('should remove ingredient', () => {
    const spyRemoveAt = jest.spyOn(component.ingredients, 'removeAt');
    component.addIngredient();
    component.removeIngredient(0);
    expect(spyRemoveAt).toHaveBeenCalledWith(0);
    expect(component.ingredients.length).toEqual(1);
  });

  it('should not add recipe if form is invalid', () => {
    const addRecipeSpy = jest.spyOn(component['recipeService'], 'addRecipe');
   const errorSignalSetSpy = jest.spyOn(component['errorSignal'], 'set');
   const recipeFormValidSpy = jest.spyOn(component['recipeForm'], 'get');
    component.addRecipe();
    expect(component['errorSignal']()).toEqual('Please fill in all required fields.');
    expect(addRecipeSpy).not.toHaveBeenCalled();
    expect(errorSignalSetSpy).toHaveBeenCalled();
    expect(recipeFormValidSpy).toHaveBeenCalledTimes(7);
  });

  it('should add recipe', fakeAsync(() => {
    component.recipeForm.patchValue({
      title: 'Test Recipe',
      readyInMinutes: 30,
      ingredients: [{name: 'Ingredient 1', quantity: '1', unit: 'unit'}],
      instructions: 'Test Instructions',
      difficulty: 'Easy',
      imageUrl: 'https://example.com/image.jpg',
      favorite: false
    });
    const addRecipeSpy = jest.spyOn(component, 'addRecipe');
    const navigateSpy = jest.spyOn(mockRouter, 'navigate');
    const successSignalSetSpy = jest.spyOn(component['successSignal'], 'set');
    const loadingSignalSetSpy = jest.spyOn(component['loadingSignal'], 'set');

    component.addRecipe();
    fixture.detectChanges();

    expect(addRecipeSpy).toHaveBeenCalled();

    expect(successSignalSetSpy).toHaveBeenCalledWith(true);
    expect(loadingSignalSetSpy).toHaveBeenCalledWith(false);
    tick(1500);
    expect(navigateSpy).toHaveBeenCalledWith(['/recipes']);
  }));

  
  

});
