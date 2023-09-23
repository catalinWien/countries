import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from '@components/header/header.component';
import { Store } from '@ngrx/store';
import { CountriesState } from './shared/models/country';
import { initAppSession } from '@store/countries/countries.actions';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [ CommonModule, RouterOutlet, HeaderComponent ]
})
export class AppComponent {
  constructor(
    private readonly countriesStore: Store<CountriesState>
  ) {
    this.countriesStore.dispatch(initAppSession());
  }
}
