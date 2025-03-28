import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, getDocs, doc, docData, query, where, deleteDoc, updateDoc, collectionData, getDoc, } from '@angular/fire/firestore';
import { Observable, from, map, of, tap } from 'rxjs';
import { Recipe } from '../models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private readonly COLLECTION_NAME = 'recipes';

  constructor(private readonly firestore: Firestore) {}

   getAllRecipes(): Observable<Recipe[]> {
    const recipesRef = collection(this.firestore, this.COLLECTION_NAME);
    return collectionData(recipesRef, { idField: 'id' }) as Observable<Recipe[]>;
  }

  getFavoriteRecipes(): Observable<Recipe[]> {
    const recipesRef = collection(this.firestore, this.COLLECTION_NAME);
    const q = query(recipesRef, where('favorite', '==', true));
    return collectionData(q, { idField: 'id' }) as Observable<Recipe[]>;
  }

   getRecipeById(id: string): Observable<Recipe | null> {
    const docRef = doc(this.firestore, this.COLLECTION_NAME, id);
    return docData(docRef, { idField: 'id' }) as Observable<Recipe | null>;
  }

  setFavorite(id: string, isFavorite: boolean): Observable<void> {
    const docRef = doc(this.firestore, this.COLLECTION_NAME, id);
    return from(updateDoc(docRef, { favorite: isFavorite }));
  }

 

  searchRecipes(searchTerms: string[]): Observable<Recipe[]> {
    if (!searchTerms || searchTerms.length === 0) {
      return of([]);
    }

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