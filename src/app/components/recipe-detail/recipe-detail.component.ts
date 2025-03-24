import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  recipe: Recipe | null = null;
  loading: boolean = true;
  error: string = '';
  subscription!: Subscription;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly recipeService: RecipeService,
  ) {}

  ngOnInit(): void {
    const recipeId = this.route.snapshot.paramMap.get('id') || '';
    this.loadRecipe(recipeId);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private loadRecipe(id: string): void {
    this.loading = true;
    this.error = '';
    
    this.subscription = this.recipeService.getRecipeById(id).subscribe({
      next: (recipe: Recipe) => {
        this.recipe = recipe;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error loading recipe details. Please try again.';
        this.loading = false;
      }
    });
  }

  toggleFavorite(): void {
    if (!this.recipe) return;
    else {
      this.recipeService.setFavorite(this.recipe.id, !this.recipe.favorite).subscribe({
        next: () => {
          if(this.recipe) {
            this.recipe.favorite = !this.recipe.favorite;
          }
        },
        error: (error) => {
          this.error = 'Error toggling favorite. Please try again: ' + error;
        }
      });
    }
  }
} 