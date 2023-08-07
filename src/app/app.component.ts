import { CUSTOM_ELEMENTS_SCHEMA, Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from './shared/angular-material.module';
import { CountryListComponent } from './core/components/country-list/country-list.component';
import { CountryDetailsComponent } from './core/components/country-details/country-details.component';
import { fetchAllCountriesList } from './shared/store/countries/countries.actions';
import { CountriesState } from './shared/models/countries';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, AngularMaterialModule, CountryListComponent, CountryDetailsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AppComponent implements OnInit {
  constructor( private store: Store<CountriesState> ) {}

  ngOnInit(): void {
    this.store.dispatch(fetchAllCountriesList());
  }
}
