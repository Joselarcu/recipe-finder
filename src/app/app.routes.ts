import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: '', 
    loadComponent: () => import('./components/recipe-search/recipe-search.component').then(m => m.RecipeSearchComponent)
  },
  { 
    path: 'recipe/:id', 
    loadComponent: () => import('./components/recipe-detail/recipe-detail.component').then(m => m.RecipeDetailComponent)
  },
  { 
    path: 'favorites', 
    loadComponent: () => import('./components/favorites/favorites.component').then(m => m.FavoritesComponent)
  },
  { 
    path: 'new-recipe', 
    loadComponent: () => import('./components/add-recipe/add-recipe.component').then(m => m.AddRecipeComponent)
  },
  { 
    path: 'books', 
    loadComponent: () => import('./components/books/books.component').then(m => m.BooksComponent)
  },
  { path: '**', redirectTo: '' }
];
