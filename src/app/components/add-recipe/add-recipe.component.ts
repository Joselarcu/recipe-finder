import { Component, computed, effect, signal, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe.model';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-add-recipe',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-recipe.component.html',
  styleUrl: './add-recipe.component.scss'
})
export class AddRecipeComponent {
  recipeForm: FormGroup;
  private readonly errorSignal = signal<string>('');
  readonly error = computed(() => this.errorSignal());
  private readonly loadingSignal = signal<boolean>(false);
  readonly loading = computed(() => this.loadingSignal());
  private readonly successSignal = signal<boolean>(false);
  readonly success = computed(() => this.successSignal());
  private readonly injector: Injector;
  

  constructor(
    private readonly fb: FormBuilder,
    private readonly recipeService: RecipeService,
    private readonly router: Router,
    injector: Injector
  ) {
    this.injector = injector;
    this.recipeForm = this.fb.group({
        title: ['', Validators.required],
      readyInMinutes: [0, [Validators.required, Validators.min(0)]],
         ingredients: this.fb.array([]),
      instructions: ['', Validators.required],
      difficulty: ['', Validators.required],
      imageUrl: [''],
         favorite: [false]
    });

      this.addIngredient();

    effect(() => {
      if (this.recipeForm.valid) {
        this.errorSignal.set('');
      }
    });
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
      this.loadingSignal.set(true);
      this.errorSignal.set('');
      this.successSignal.set(false);

      const recipeData: Omit<Recipe, 'id'> = {
        ...this.recipeForm.value
      };
      const recipeIdSignal = toSignal(
        this.recipeService.addRecipe(recipeData),
        { initialValue: null, injector: this.injector }
      );

      effect(() => {
        const recipeId = recipeIdSignal();
        if (recipeId) {
          this.successSignal.set(true);
          this.loadingSignal.set(false);
          setTimeout(() => {
            this.router.navigate(['/recipes']);
          }, 1500);
        }
      }, {injector: this.injector});
    } else {
      this.errorSignal.set('Please fill in all required fields.');
      Object.keys(this.recipeForm.controls).forEach(key => {
        const control = this.recipeForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
  }

}
