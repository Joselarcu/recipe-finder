import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-recipe',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-recipe.component.html',
  styleUrl: './add-recipe.component.scss'
})
export class AddRecipeComponent implements OnInit, OnDestroy {
  recipeForm: FormGroup;
  errorMessage: string = '';
  subscription: Subscription = new Subscription();

  constructor(
    private readonly fb: FormBuilder,
    private readonly recipeService: RecipeService,
    private readonly router: Router
  ) {
    this.recipeForm = this.fb.group({
      title: ['', Validators.required],
      readyInMinutes: [0, [Validators.required, Validators.min(0)]],
      ingredients: this.fb.array([]),
      instructions: ['', Validators.required],
      difficulty: [''],
      imageUrl: [''],
      favorite: [false]
    });
  }

  ngOnInit(): void {
    this.addIngredient();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  get ingredients() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  addIngredient(): void {
    const ingredientForm = this.fb.group({
      name: ['', Validators.required],
      quantity: ['', Validators.required],
      unit: ['']
    });
    this.ingredients.push(ingredientForm);
  }

  removeIngredient(index: number): void {
    if (this.ingredients.length > 1) {
      this.ingredients.removeAt(index);
    }
  }

  addRecipe(): void {
    if (this.recipeForm.valid) {
      const recipeData: Omit<Recipe, 'id'> = {
        ...this.recipeForm.value
      };

     this.subscription = this.recipeService.addRecipe(recipeData).subscribe({
        next: (recipeId) => {
          if (recipeId) {
            this.router.navigate(['/recipes']);
          } else {
            this.errorMessage = 'There was an error adding the recipe. Please try again.';
          }
        },
        error: (error) => {
          this.errorMessage = 'Error adding recipe: ' + error;
        }
      });
    } else {
      this.errorMessage = 'Please fill in all required fields.';
      Object.keys(this.recipeForm.controls).forEach(key => {
        const control = this.recipeForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
  }
}
