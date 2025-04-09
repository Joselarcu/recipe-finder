import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';
import bootstrap from './main.server';

jest.mock('@angular/platform-browser', () => ({
  bootstrapApplication: jest.fn(() => Promise.resolve())
}));

jest.mock('./app/app.component', () => ({
  AppComponent: class {}
}));

jest.mock('./app/app.config.server', () => ({
  config: {
    providers: ['test-provider']
  }
}));

describe('MainServer', () => {
  it('should export bootstrap function', () => {
    expect(bootstrap).toBeDefined();
    expect(typeof bootstrap).toBe('function');
  });

  it('should call bootstrapApplication with correct parameters', async () => {
    await bootstrap();
    expect(bootstrapApplication).toHaveBeenCalledWith(AppComponent, config);
  });
}); 