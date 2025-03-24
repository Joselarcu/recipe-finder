import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe.model';
import { RecipeCardComponent } from '../ui/recipe-card/recipe-card.component';

@Component({
  selector: 'app-recipe-search',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, RecipeCardComponent],
  templateUrl: './recipe-search.component.html',
  styleUrls: ['./recipe-search.component.scss']
})
export class RecipeSearchComponent {
  searchQuery: string = '';
  recipes: Recipe[] = [];
  loading: boolean = false;
  error: string = '';

  constructor(private readonly recipeService: RecipeService) {
    this.searchRecipes();
  }

  searchRecipes(): void {
    if (!this.searchQuery.trim()) {
      this.recipeService.getAllRecipes().subscribe((recipes) => {
        this.recipes = recipes;
        this.loading = false;
      });
      return
    }

    this.loading = true;
    this.error = '';
    this.recipes = [];

    this.recipeService.searchRecipes(this.searchQuery.toLowerCase().split(' ')).subscribe({
      next: (recipes) => {
        this.recipes = recipes;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error searching for recipes. Please try again.';
        this.loading = false;
      }
    });
  }
} 