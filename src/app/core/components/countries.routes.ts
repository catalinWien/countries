import { Routes } from '@angular/router';

import { CountryListComponent } from '@core/components/country-list/country-list.component';
import { CountryDetailsComponent } from '@core/components/country-details/country-details.component';

export const countriesRoutes: Routes = [
  { path: '', component: CountryListComponent },
  { path: ':cca3', component: CountryDetailsComponent }
];
