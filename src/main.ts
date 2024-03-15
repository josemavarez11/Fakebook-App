import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withViewTransitions } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';

import { routes } from './app/router/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getStorage, provideStorage } from '@angular/fire/storage';

import { IonicStorageModule } from '@ionic/storage-angular';
import { Drivers } from '@ionic/storage';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"fakebookapp-136bd","appId":"1:362377131316:web:cc1470efe53eccdbc1e161","storageBucket":"fakebookapp-136bd.appspot.com","apiKey":"AIzaSyCLURykrCzOVyTiGofg6vgjJkwexOz3_t4","authDomain":"fakebookapp-136bd.firebaseapp.com","messagingSenderId":"362377131316"}))), importProvidersFrom(provideStorage(() => getStorage())),
    importProvidersFrom(IonicModule.forRoot({})),
    importProvidersFrom(IonicStorageModule.forRoot({
      name: 'appdb',
      driverOrder: [Drivers.IndexedDB]
    })),
    provideRouter(routes,
      withViewTransitions())
  ],
});
//,"locationId":"us-central"
