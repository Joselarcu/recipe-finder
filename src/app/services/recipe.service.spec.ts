/// <reference types="jest" />
import { TestBed } from '@angular/core/testing';
import { RecipeService } from './recipe.service';
import { Firestore, collection, collectionData, doc, docData, query, where, addDoc, updateDoc, deleteDoc, getDocs } from '@angular/fire/firestore';
import { Recipe } from '../models/recipe.model';
import { firstValueFrom, of } from 'rxjs';
import { expect } from '@jest/globals';

jest.mock('@angular/fire/firestore');

describe('RecipeService', () => {
  let service: RecipeService;
  let mockFirestore: jest.Mocked<Firestore>;

  const mockRecipes: Recipe[] = [
    {
      id: '1',
      title: 'Test Recipe 1',
      readyInMinutes: 30,
      instructions: 'Test instructions 1',
      favorite: true,
      ingredients: [{ name: 'Ingredient 1', quantity: '1', unit: 'unit' }],
      difficulty: 'easy',
      imageUrl: 'test1.jpg',
      keywords: ['test', 'recipe', '1', 'ingredient']
    },
    {
      id: '2',
      title: 'Test Recipe 2',
      readyInMinutes: 45,
      instructions: 'Test instructions 2',
      favorite: false,
      ingredients: [{ name: 'Ingredient 2', quantity: '2', unit: 'unit' }],
      difficulty: 'medium',
      imageUrl: 'test2.jpg',
      keywords: ['test', 'recipe', '2', 'ingredient']
    }
  ];

  beforeEach(() => {
    mockFirestore = {
      collection: jest.fn(),
      doc: jest.fn()
    } as any;

    (collection as jest.Mock).mockReturnValue('collection-ref');
    (doc as jest.Mock).mockReturnValue('doc-ref');
    (collectionData as jest.Mock).mockReturnValue(of(mockRecipes));
    (docData as jest.Mock).mockReturnValue(of(mockRecipes[0]));
    (query as jest.Mock).mockReturnValue('query-ref');
    (where as jest.Mock).mockReturnValue('where-condition');
    (addDoc as jest.Mock).mockResolvedValue({ id: '1' });
    (updateDoc as jest.Mock).mockResolvedValue(undefined);
    (deleteDoc as jest.Mock).mockResolvedValue(undefined);
    (getDocs as jest.Mock).mockResolvedValue({
      docs: [
        {
          id: '1',
          data: () => ({
            title: mockRecipes[0].title,
            readyInMinutes: mockRecipes[0].readyInMinutes,
            instructions: mockRecipes[0].instructions,
            favorite: mockRecipes[0].favorite,
            ingredients: mockRecipes[0].ingredients,
            difficulty: mockRecipes[0].difficulty,
            imageUrl: mockRecipes[0].imageUrl,
            keywords: mockRecipes[0].keywords
          })
        }
      ]
    });

    TestBed.configureTestingModule({
      providers: [
        RecipeService,
        { provide: Firestore, useValue: mockFirestore }
      ]
    });

    service = TestBed.inject(RecipeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAllRecipes', () => {
    it('should return all recipes', (done) => {
      service.getAllRecipes().subscribe(recipes => {
        expect(collection).toHaveBeenCalledWith(mockFirestore, 'recipes');
        expect(collectionData).toHaveBeenCalledWith('collection-ref', { idField: 'id' });
        expect(recipes).toEqual(mockRecipes);
        done();
      });
    });
  });

  describe('getFavoriteRecipes', () => {
    it('should return favorite recipes', (done) => {
      service.getFavoriteRecipes().subscribe(recipes => {
        expect(collection).toHaveBeenCalledWith(mockFirestore, 'recipes');
        expect(where).toHaveBeenCalledWith('favorite', '==', true);
        expect(query).toHaveBeenCalledWith('collection-ref', 'where-condition');
        expect(collectionData).toHaveBeenCalledWith('query-ref', { idField: 'id' });
        expect(recipes).toEqual(mockRecipes);
        done();
      });
    });
  });

  describe('getRecipeById', () => {
    it('should return a recipe by id', (done) => {
      service.getRecipeById('1').subscribe(recipe => {
        expect(doc).toHaveBeenCalledWith(mockFirestore, 'recipes', '1');
        expect(docData).toHaveBeenCalledWith('doc-ref', { idField: 'id' });
        expect(recipe).toEqual(mockRecipes[0]);
        done();
      });
    });
  });

  describe('setFavorite', () => {
    it('should update recipe favorite status', async () => {
      await firstValueFrom(service.setFavorite('1', true));
      expect(doc).toHaveBeenCalledWith(mockFirestore, 'recipes', '1');
      expect(updateDoc).toHaveBeenCalledWith('doc-ref', { favorite: true });
    });
  });

  describe('searchRecipes', () => {
    it('should return empty array for empty search terms', (done) => {
      service.searchRecipes([]).subscribe(recipes => {
        expect(recipes).toEqual([]);
        done();
      });
    });

    it('should return empty array for null search terms', (done) => {
      service.searchRecipes(null as any).subscribe(recipes => {
        expect(recipes).toEqual([]);
        done();
      });
    });

    it('should search recipes by keywords', async () => {
      const searchTerms = ['test'];
      const result = await firstValueFrom(service.searchRecipes(searchTerms));
      
      expect(collection).toHaveBeenCalledWith(mockFirestore, 'recipes');
      expect(where).toHaveBeenCalledWith('keywords', 'array-contains', 'test');
      expect(query).toHaveBeenCalledWith('collection-ref', 'where-condition');
      expect(getDocs).toHaveBeenCalled();
      expect(result).toEqual([{ 
        id: '1',
        title: mockRecipes[0].title,
        readyInMinutes: mockRecipes[0].readyInMinutes,
        instructions: mockRecipes[0].instructions,
        favorite: mockRecipes[0].favorite,
        ingredients: mockRecipes[0].ingredients,
        difficulty: mockRecipes[0].difficulty,
        imageUrl: mockRecipes[0].imageUrl,
        keywords: mockRecipes[0].keywords
      }]);
    });

    it('should handle multiple search terms and return unique results', async () => {
      const searchTerms = ['test', 'recipe'];
      (getDocs as jest.Mock).mockResolvedValueOnce({
        docs: [
          { 
            id: '1',
            data: () => ({
              title: mockRecipes[0].title,
              readyInMinutes: mockRecipes[0].readyInMinutes,
              instructions: mockRecipes[0].instructions,
              favorite: mockRecipes[0].favorite,
              ingredients: mockRecipes[0].ingredients,
              difficulty: mockRecipes[0].difficulty,
              imageUrl: mockRecipes[0].imageUrl,
              keywords: mockRecipes[0].keywords
            })
          },
          { 
            id: '2',
            data: () => ({
              title: mockRecipes[1].title,
              readyInMinutes: mockRecipes[1].readyInMinutes,
              instructions: mockRecipes[1].instructions,
              favorite: mockRecipes[1].favorite,
              ingredients: mockRecipes[1].ingredients,
              difficulty: mockRecipes[1].difficulty,
              imageUrl: mockRecipes[1].imageUrl,
              keywords: mockRecipes[1].keywords
            })
          }
        ]
      });
      
      const result = await firstValueFrom(service.searchRecipes(searchTerms));
      
      expect(collection).toHaveBeenCalledWith(mockFirestore, 'recipes');
      expect(where).toHaveBeenCalledWith('keywords', 'array-contains', 'test');
      expect(query).toHaveBeenCalledWith('collection-ref', 'where-condition');
      expect(getDocs).toHaveBeenCalled();
      expect(result.length).toBe(2);
      expect(result).toEqual([
        {
          id: '1',
          title: mockRecipes[0].title,
          readyInMinutes: mockRecipes[0].readyInMinutes,
          instructions: mockRecipes[0].instructions,
          favorite: mockRecipes[0].favorite,
          ingredients: mockRecipes[0].ingredients,
          difficulty: mockRecipes[0].difficulty,
          imageUrl: mockRecipes[0].imageUrl,
          keywords: mockRecipes[0].keywords
        },
        {
          id: '2',
          title: mockRecipes[1].title,
          readyInMinutes: mockRecipes[1].readyInMinutes,
          instructions: mockRecipes[1].instructions,
          favorite: mockRecipes[1].favorite,
          ingredients: mockRecipes[1].ingredients,
          difficulty: mockRecipes[1].difficulty,
          imageUrl: mockRecipes[1].imageUrl,
          keywords: mockRecipes[1].keywords
        }
      ]);
    });
  });

  describe('addRecipe', () => {
    it('should add a new recipe and return its id', async () => {
      const newRecipe: Omit<Recipe, 'id'> = {
        title: 'New Recipe',
        readyInMinutes: 30,
        instructions: 'New instructions',
        favorite: false,
        ingredients: [{ name: 'New Ingredient', quantity: '1', unit: 'unit' }],
        difficulty: 'easy',
        imageUrl: 'new.jpg'
      };

      const result = await firstValueFrom(service.addRecipe(newRecipe));
      
      expect(collection).toHaveBeenCalledWith(mockFirestore, 'recipes');
      expect(addDoc).toHaveBeenCalledWith('collection-ref', {
        ...newRecipe,
        keywords: ['new', 'recipe', 'new ingredient']
      });
      expect(result).toBe('1');
    });
  });

  describe('deleteRecipe', () => {
    it('should delete a recipe', async () => {
      await firstValueFrom(service.deleteRecipe('1'));
      expect(doc).toHaveBeenCalledWith(mockFirestore, 'recipes', '1');
      expect(deleteDoc).toHaveBeenCalledWith('doc-ref');
    });
  });
});
