import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe.model';
import { RecipeCardComponent } from '../ui/recipe-card/recipe-card.component';
import { Subject, Subscription, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

@Component({
  selector: 'app-recipe-search',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, RecipeCardComponent],
  templateUrl: './recipe-search.component.html',
  styleUrls: ['./recipe-search.component.scss']
})
export class RecipeSearchComponent implements OnInit, OnDestroy {
  searchQuery: string = '';
  recipes: Recipe[] = [];
  loading: boolean = false;
  error: string = '';
  private readonly searchSubject = new Subject<string>();
  private readonly subscription: Subscription = new Subscription();

  constructor(private readonly recipeService: RecipeService) {}

  ngOnInit(): void {
    this.setupSearch();
    this.searchAllRecipes();
  }

  private setupSearch(): void {
    this.subscription.add(
      this.searchSubject.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(query => {
          if (!query) {
            return this.recipeService.getAllRecipes();
          }
          return this.recipeService.searchRecipes(query.toLowerCase().split(' '));
        })
      ).subscribe({
        next: (recipes) => {
          this.recipes = recipes;
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Error searching for recipes. Please try again: ' + error;
          this.loading = false;
        }
      })
    );
  }

  searchAllRecipes(): void {
    this.loading = true;
    this.error = '';
    this.recipes = [];
    this.subscription.add(
      this.recipeService.getAllRecipes().subscribe({
        next: (recipes) => {
          this.recipes = recipes;
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Error searching for recipes. Please try again, ' + error;
          this.loading = false;
        }
      })
    );
  }

  searchRecipes(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.loading = true;
    this.searchSubject.next(input.value);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
} 