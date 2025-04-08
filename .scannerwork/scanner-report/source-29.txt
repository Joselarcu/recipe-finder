import { TestBed } from '@angular/core/testing';
import { RecipeService } from './recipe.service';
import { Firestore } from '@angular/fire/firestore';
// import { Recipe } from '../models/recipe.model';

describe('RecipeService', () => {
  let service: RecipeService;
  let mockFirestore: jest.Mocked<Firestore>;
  let mockCollection: jest.Mock;
  let mockDoc: jest.Mock;
  let mockQuery: jest.Mock;
  let mockCollectionData: jest.Mock;
  let mockDocData: jest.Mock;
  let mockAddDoc: jest.Mock;
  let mockUpdateDoc: jest.Mock;
  let mockDeleteDoc: jest.Mock;
  let mockGetDocs: jest.Mock;

  // const mockRecipes: Recipe[] = [
  //   {
  //     id: '1',
  //     title: 'Test Recipe 1',
  //     readyInMinutes: 30,
  //     instructions: 'Test instructions 1',
  //     favorite: true,
  //     ingredients: [{ name: 'Ingredient 1', quantity: '1', unit: 'unit' }],
  //     difficulty: 'easy',
  //     imageUrl: 'test1.jpg',
  //     keywords: ['test', 'recipe', '1', 'ingredient']
  //   },
  //   {
  //     id: '2',
  //     title: 'Test Recipe 2',
  //     readyInMinutes: 45,
  //     instructions: 'Test instructions 2',
  //     favorite: false,
  //     ingredients: [{ name: 'Ingredient 2', quantity: '2', unit: 'unit' }],
  //     difficulty: 'medium',
  //     imageUrl: 'test2.jpg',
  //     keywords: ['test', 'recipe', '2', 'ingredient']
  //   }
  // ];

  beforeEach(() => {
    mockCollection = jest.fn();
    mockDoc = jest.fn();
    mockQuery = jest.fn();
    mockCollectionData = jest.fn();
    mockDocData = jest.fn();
    mockAddDoc = jest.fn();
    mockUpdateDoc = jest.fn();
    mockDeleteDoc = jest.fn();
    mockGetDocs = jest.fn();

    mockFirestore = {
      collection: mockCollection as any,
      doc: mockDoc as any,
      query: mockQuery as any,
      collectionData: mockCollectionData as any,
      docData: mockDocData as any,
      addDoc: mockAddDoc as any,
      updateDoc: mockUpdateDoc as any,
      deleteDoc: mockDeleteDoc as any,
      getDocs: mockGetDocs as any
    } as any;

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

  
});
