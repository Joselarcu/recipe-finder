import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeSearchComponent } from './recipe-search.component';
import { of } from 'rxjs';
import { RecipeService } from '../../services/recipe.service';

const recipeServiceStub = {
  getAllRecipes: () => of([])
};

describe('RecipeSearchComponent', () => {
  let component: RecipeSearchComponent;
  let fixture: ComponentFixture<RecipeSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeSearchComponent],
      providers: [
        { provide: RecipeService, useValue: recipeServiceStub }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
