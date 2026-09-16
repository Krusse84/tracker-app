import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { environment } from './environments/environment.dev';
import firebase from 'firebase/app';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideDatabase(() => getDatabase()),
  ],
};

