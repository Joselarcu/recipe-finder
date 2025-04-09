import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeCardComponent } from './recipe-card.component';
import { Firestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../../../services/recipe.service';

const firestoreStub = {
  collection: jest.fn(),
  doc: jest.fn(),
  getDocs: jest.fn(),
  addDoc: jest.fn(),
  updateDoc: jest.fn(),
  deleteDoc: jest.fn()
};

const activatedRouteStub = {
  snapshot: { params: { id: '1' } }
};

const recipeServiceStub = {
  setFavorite: jest.fn()
};

describe('RecipeCardComponent', () => {
  let component: RecipeCardComponent;
  let fixture: ComponentFixture<RecipeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeCardComponent],
      providers: [{ provide: Firestore, useValue: firestoreStub },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: RecipeService, useValue: recipeServiceStub }
      ]
    })
    .compileComponents();

    
    fixture = TestBed.createComponent(RecipeCardComponent);
    component = fixture.componentInstance;
    component.recipe = {
      id: '1',
      title: 'Test Recipe',
      readyInMinutes: 30,
      instructions: 'Test instructions',
      favorite: false,
      ingredients: [{ name: 'Ingredient 1', quantity: '1', unit: 'unit' }],
      difficulty: 'easy',
      imageUrl: 'test1.jpg',
      keywords: ['test', 'recipe', '1', 'ingredient']
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
