import { Component, computed, effect, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe.model';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent{
  private readonly recipeSignal: Signal<Recipe | null>;
  
  readonly recipe = computed(() => this.recipeSignal());
  readonly loading = computed(() => this.recipe() === null);
  readonly error = computed(() => 
    this.recipe() === undefined ? 'Error loading recipe details. Please try again.' : ''
  );

  constructor(
    private readonly route: ActivatedRoute,
    private readonly recipeService: RecipeService,
  ) {
      const id = this.route.snapshot.paramMap.get('id') || '';
      this.recipeSignal = toSignal(
        this.recipeService.getRecipeById(id),
        { initialValue: null }
      );

      effect(() => {
        console.log('recipe:',this.recipe());
        console.log('loading:',this.loading());
        console.log('error:',this.error());
      });
  }
  

  toggleFavorite(): void {
    const currentRecipe = this.recipe();
    if (!currentRecipe) return;

    this.recipeService.setFavorite(currentRecipe.id, !currentRecipe.favorite)
      .subscribe({
        error: (error) => {
          console.error('Error toggling favorite:', error);
        }
      });
  }
} 