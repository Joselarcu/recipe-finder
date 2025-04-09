import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Recipe } from '../../../models/recipe.model';
import { RecipeService } from '../../../services/recipe.service';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.scss'
})
export class RecipeCardComponent {

  @Input() recipe!: Recipe;
  @Output() reloadRecipes = new EventEmitter<void>();

  constructor(private readonly recipeService: RecipeService) {}

   toggleFromFavorites(): void {
      this.recipeService.setFavorite(this.recipe.id, !this.recipe.favorite).subscribe({
        next: () => {
          this.reloadRecipes.emit();
          this.recipe.favorite = !this.recipe.favorite;
        },
        error: (error) => {
          console.error('Error toggling favorite. Please try again, '+ error);
        }
      });
    
  }

}
