import { enableProdMode, importProvidersFrom } from '@angular/core';

import { environment } from './environments/environment';
import { AppComponent } from '@app/app.component';
import { HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { coutriesReducer } from '@app/shared/store/countries/countries.store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CountriesEffects } from '@app/shared/store/countries/countries.effects';
import { EffectsModule } from '@ngrx/effects';
import { AngularMaterialModule } from '@app/shared/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { appRoutes } from '@app/app-routing.module';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      BrowserAnimationsModule,
      HttpClientModule,
      RouterModule.forRoot(appRoutes),
      AngularMaterialModule,
      FormsModule,
      ReactiveFormsModule,
      StoreModule.forRoot({
        countries: coutriesReducer,
      }),
      StoreRouterConnectingModule.forRoot(),
      StoreDevtoolsModule.instrument({name: 'Countries store', maxAge: 5}),
      EffectsModule.forRoot([CountriesEffects])
    ),
    CommonModule,
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi())
  ]
})
  .catch(err => console.error(err));
