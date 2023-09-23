import { Route } from '@angular/router';

import { CountriesListComponent } from '@app/country-list/countries-list.component';
import { CountriesDetailsComponent } from '@app/country-details/country-details.component';

export const APP_ROUTES: Route[] = [
  {path: '', component: CountriesListComponent},
  {path: 'country/:cca3', component: CountriesDetailsComponent},
];
