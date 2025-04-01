import { Component, Signal, signal, Injector, computed  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Recipe } from '../../models/recipe.model';
import { RecipeService } from '../../services/recipe.service';
import { RecipeCardComponent } from '../ui/recipe-card/recipe-card.component';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, RouterModule, RecipeCardComponent],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent  {

  recipes: Signal<Recipe[] | null> = signal(null);
  loading = computed(() => this.recipes() === null);
  
  constructor(private readonly recipeService: RecipeService, private readonly injector: Injector) {
    this.loadFavoriteRecipes();
  }


  loadFavoriteRecipes(): void {
    this.recipes = toSignal(
      this.recipeService.getFavoriteRecipes(),
      { initialValue: null, injector: this.injector }
    );
  }

    
} 