import { routes } from './app.routes';

describe('AppRoutes', () => {
  it('should define all routes', () => {
    expect(routes).toBeDefined();
    expect(routes.length).toBe(5);
  });

  it('should have home route', () => {
    const homeRoute = routes[0];
    expect(homeRoute.path).toBe('');
    expect(homeRoute.loadComponent).toBeDefined();
  });

  it('should have recipe detail route', () => {
    const recipeRoute = routes[1];
    expect(recipeRoute.path).toBe('recipe/:id');
    expect(recipeRoute.loadComponent).toBeDefined();
  });

  it('should have favorites route', () => {
    const favoritesRoute = routes[2];
    expect(favoritesRoute.path).toBe('favorites');
    expect(favoritesRoute.loadComponent).toBeDefined();
  });

  it('should have new recipe route', () => {
    const newRecipeRoute = routes[3];
    expect(newRecipeRoute.path).toBe('new-recipe');
    expect(newRecipeRoute.loadComponent).toBeDefined();
  });

  it('should have wildcard route', () => {
    const wildcardRoute = routes[4];
    expect(wildcardRoute.path).toBe('**');
    expect(wildcardRoute.redirectTo).toBe('');
  });

  it('should have correct component imports', async () => {
    const homeComponent = await routes[0].loadComponent!();
    expect(homeComponent).toBeDefined();

    const recipeComponent = await routes[1].loadComponent!();
    expect(recipeComponent).toBeDefined();

    const favoritesComponent = await routes[2].loadComponent!();
    expect(favoritesComponent).toBeDefined();

    const newRecipeComponent = await routes[3].loadComponent!();
    expect(newRecipeComponent).toBeDefined();
  });
}); 