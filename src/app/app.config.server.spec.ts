import { provideServerRendering } from '@angular/platform-server';
import { provideServerRouting } from '@angular/ssr';
import { config } from './app.config.server';

jest.mock('@angular/platform-server', () => ({
  provideServerRendering: jest.fn(() => 'server-rendering-provider')
}));

jest.mock('@angular/ssr', () => ({
  provideServerRouting: jest.fn(() => 'server-routing-provider')
}));

jest.mock('./app.config', () => ({
  appConfig: {
    providers: ['app-provider']
  }
}));

jest.mock('./app.routes.server', () => ({
  serverRoutes: ['route1', 'route2']
}));

describe('AppConfigServer', () => {
  it('should merge application config with server config', () => {
    expect(config).toBeDefined();
    expect(config.providers).toContain('server-rendering-provider');
    expect(config.providers).toContain('server-routing-provider');
    expect(config.providers).toContain('app-provider');
  });

  it('should call provideServerRendering', () => {
    expect(provideServerRendering).toHaveBeenCalled();
  });

  it('should call provideServerRouting with serverRoutes', () => {
    expect(provideServerRouting).toHaveBeenCalledWith(['route1', 'route2']);
  });
}); 