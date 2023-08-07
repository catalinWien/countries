import { Routes } from '@angular/router';

import { AppComponent } from '@app/app.component';
import { CountryListComponent } from './core/components/country-list/country-list.component';

export const appRoutes: Routes = [
  { path: '', component: CountryListComponent },
  {
    path: 'countries',
    loadChildren: () =>
      import('@core/components/countries.routes').then(
        (m) => m.countriesRoutes
      ),
  }
];
