import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { appConfig } from './app.config';

jest.mock('@angular/router', () => ({
  provideRouter: jest.fn(() => 'router-provider')
}));

jest.mock('@angular/common/http', () => ({
  provideHttpClient: jest.fn(() => 'http-provider')
}));

jest.mock('@angular/fire/firestore', () => ({
  provideFirestore: jest.fn(() => 'firestore-provider'),
  getFirestore: jest.fn(() => 'firestore-instance')
}));

jest.mock('@angular/fire/app', () => ({
  provideFirebaseApp: jest.fn(() => 'firebase-app-provider'),
  initializeApp: jest.fn(() => 'firebase-app-instance')
}));

jest.mock('./app.routes', () => ({
  routes: ['route1', 'route2']
}));

jest.mock('../environments/environment', () => ({
  environment: {
    firebase: {
      apiKey: 'test-key',
      authDomain: 'test-domain',
      projectId: 'test-project',
      storageBucket: 'test-bucket',
      messagingSenderId: 'test-sender',
      appId: 'test-app-id'
    }
  }
}));

describe('AppConfig', () => {
  it('should create app configuration with all providers', () => {
    expect(appConfig).toBeDefined();
    expect(appConfig.providers).toContain('router-provider');
    expect(appConfig.providers).toContain('http-provider');
    expect(appConfig.providers).toContain('firestore-provider');
    expect(appConfig.providers).toContain('firebase-app-provider');
  });

  it('should call provideRouter with routes', () => {
    expect(provideRouter).toHaveBeenCalledWith(['route1', 'route2']);
  });

  it('should call provideHttpClient', () => {
    expect(provideHttpClient).toHaveBeenCalled();
  });
}); 