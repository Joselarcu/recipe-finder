import { Ingredient } from "./ingredient.model";

export interface Recipe {
  id: string;
  title: string;
  readyInMinutes: number;
  instructions: string;
  favorite: boolean;
  ingredients: Ingredient[];
  difficulty: string;
  imageUrl?: string;
  keywords?: string[];
} 