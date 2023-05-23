import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from '@app/app.component';
import { CountryListComponent } from '@core/components/country-list/country-list.component';
import { CountryDetailsComponent } from '@core/components/country-details/country-details.component';


const routes: Routes = [
  { path: '', redirectTo: '/country/list', pathMatch: 'full' },
  { path: 'country/list', component: CountryListComponent },
  { path: 'country/:cca3', component: CountryDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
