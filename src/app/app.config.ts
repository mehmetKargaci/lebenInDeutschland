import {ApplicationConfig, importProvidersFrom, isDevMode, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {NgxIndexedDBModule, DBConfig} from 'ngx-indexed-db';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { provideServiceWorker } from '@angular/service-worker';



const dbConfig: DBConfig  = {
  name: 'MyDb',
  version: 3,
  objectStoresMeta: [{
    store: 'question-data',
    storeConfig: { keyPath: 'questionIndex', autoIncrement: false },
    storeSchema: [
      { name: 'status', keypath: 'status', options: { unique: false } }
    ]
  }],
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(NgxIndexedDBModule.forRoot(dbConfig)), provideAnimationsAsync(), provideCharts(withDefaultRegisterables()),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    })
  ]
};
