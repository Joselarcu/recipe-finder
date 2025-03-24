import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Recipe } from '../../models/recipe.model';
import { RecipeService } from '../../services/recipe.service';
import { RecipeCardComponent } from '../ui/recipe-card/recipe-card.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, RouterModule, RecipeCardComponent],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent implements OnInit, OnDestroy {

  recipes: Recipe[] = [];
  subscription!: Subscription;

  constructor(private readonly recipeService: RecipeService) {}

  ngOnInit(): void {
    this.loadFavoriteRecipes();
  }

  loadFavoriteRecipes(): void {
    this.subscription = this.recipeService.getFavoriteRecipes().subscribe((recipes) => {
      this.recipes = recipes;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
    
} 