import { CommonModule, NgIf, NgForOf } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryCardComponent } from '@components/country-card/country-card.component';
import { CountriesState, SelectedCountryState } from '@models/country';
import { AngularMaterialModule } from '@modules/angular-material.module';
import { Store, select } from '@ngrx/store';
import { NavigationService } from '@services/navigation.service';
import { setCCA3ForSelectedCountry } from '@store/countries/countries.actions';
import { getSelectedCountry } from '@store/countries/countries.selectors';
import { Observable, Subject, map, takeUntil } from 'rxjs';

@Component({
  standalone: true,
  selector: 'country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.scss'],
  imports: [ CommonModule, NgIf, NgForOf, AngularMaterialModule, CountryCardComponent ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

})
export class CountriesDetailsComponent implements OnInit, OnDestroy {
  private readonly unsubscribe: Subject<void> = new Subject<void>();
  selectedCountryDetailsResult$!: Observable<SelectedCountryState | undefined>;
  routingParam!: string;

  constructor(
    private readonly store: Store<CountriesState>,
    private router: Router,
    private route: ActivatedRoute,
    private navigation: NavigationService
    ) {}

  ngOnInit(): void {
    this.route.params
    .pipe(takeUntil(this.unsubscribe))
    .subscribe(params => {
      this.routingParam = params['cca3'];
      this.store.dispatch(setCCA3ForSelectedCountry(this.routingParam));
    });
  
    this.selectedCountryDetailsResult$ = this.store
      .pipe(
        select(getSelectedCountry),
        map((selectedCountry) => {
          if (!!selectedCountry?.country?.cca3 && selectedCountry?.cca3 === this.routingParam) {
            return selectedCountry;
          } else {
            this.router.navigate(['/']);
            return;
          }
        })
      );
  }

  goToNeighborDetails(selectedCountryCCA3: string | undefined): void {
    if (selectedCountryCCA3) {
      this.router.navigate(['/country', selectedCountryCCA3]);
    }
  }

  goBack(): void {
    this.navigation.back()
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
