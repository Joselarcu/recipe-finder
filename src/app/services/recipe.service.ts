import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, getDocs, doc, getDoc, query, where, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Observable, from, map, tap } from 'rxjs';
import { Recipe } from '../models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private readonly COLLECTION_NAME = 'recipes';

  constructor(private readonly firestore: Firestore) {}

  getFavoriteRecipes(): Observable<Recipe[]> {
    const recipesRef = collection(this.firestore, this.COLLECTION_NAME);
    const q = query(recipesRef, where('favorite', '==', true));
    
    return from(getDocs(q)).pipe(
      map(snapshot => snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data() as Omit<Recipe, 'id'>
      })))
    );
  }

  setFavorite(id: string, isFavorite: boolean): Observable<void> {
    const docRef = doc(this.firestore, this.COLLECTION_NAME, id);
    return from(updateDoc(docRef, { favorite: isFavorite }));
  }

  getAllRecipes(): Observable<Recipe[]> {
    const recipesRef = collection(this.firestore, this.COLLECTION_NAME);
    return from(getDocs(recipesRef)).pipe(
      map(snapshot => snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data() as Omit<Recipe, 'id'>
      })))
    );
  }

  searchRecipes(searchTerms: string[]): Observable<Recipe[]> {
    const recipesRef = collection(this.firestore, this.COLLECTION_NAME);
    
    const lowercaseTerms = searchTerms.map(term => term.toLowerCase());
    
    const queries = lowercaseTerms.map(term => 
      query(recipesRef, where('keywords', 'array-contains', term))
    );
    
    return from(Promise.all(queries.map(q => getDocs(q)))).pipe(
      map(snapshots => {
        const uniqueRecipes = new Map();
        
        snapshots.forEach(snapshot => {
          snapshot.docs.forEach(doc => {
            if (!uniqueRecipes.has(doc.id)) {
              uniqueRecipes.set(doc.id, {
                id: doc.id,
                ...doc.data() as Omit<Recipe, 'id'>
              });
            }
          });
        });
        
        return Array.from(uniqueRecipes.values());
      })
    );
  }

  getRecipeById(id: string): Observable<Recipe> {
    const docRef = doc(this.firestore, this.COLLECTION_NAME, id);
    return from(getDoc(docRef)).pipe(
      map(doc => ({
        id: doc.id,
        ...doc.data() as Omit<Recipe, 'id'>
      }))
    );
  }

  addRecipe(recipe: Omit<Recipe, 'id'>): Observable<string> {
   const keywords = [...recipe.title.split(' ').map(word => word.toLowerCase()), ...recipe.ingredients.map(ingredient => ingredient.name.toLowerCase())];
    recipe.keywords = keywords;
   const recipesRef = collection(this.firestore, this.COLLECTION_NAME);
    return from(addDoc(recipesRef, recipe)).pipe(
      map(docRef => docRef.id)
    );
  }

  deleteRecipe(id: string): Observable<void> {
    const docRef = doc(this.firestore, this.COLLECTION_NAME, id);
    return from(deleteDoc(docRef));
  }
} 