import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { APP_ROUTES } from '@routes/app.route';
import { provideAnimations } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { AngularMaterialModule } from '@modules/angular-material.module';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from '@app/app.component';
import { getCountriesReducer } from '@store/countries/countries.store';
import { CountriesEffects } from '@store/countries/countries.effects';
import { CountriesService } from '@services/countries.service';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      HttpClientModule,
      AngularMaterialModule,
      StoreModule.forRoot({
        countries: getCountriesReducer,
      }),
      StoreDevtoolsModule.instrument(),
      EffectsModule.forRoot([ CountriesEffects ]),
      CountriesService
    ),
    provideRouter(APP_ROUTES),
    provideAnimations()
  ]
});