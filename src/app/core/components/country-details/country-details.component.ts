import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { CountriesState, Neighbor, SelectedCountryState } from '@app/shared/models/countries';
import { AngularMaterialModule } from '@app/shared/angular-material.module';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { storeSelectedCca3 } from '@app/shared/store/countries/countries.actions';
import { selectCountryByCca3, selectNeighbours } from '@app/shared/store/countries/countries.selectors';
import { Subject, filter, takeUntil, Observable, tap } from 'rxjs';
import { CONFIGS } from '@app/shared/configs/configs';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.scss'],
  standalone: true,
  imports: [CommonModule, NgIf, NgForOf, RouterModule, AngularMaterialModule]
})
export class CountryDetailsComponent implements OnInit {
  currentCountry$?: Observable<SelectedCountryState | undefined>;
  currencies: string | undefined;
  languages: string | undefined;
  neighborhoodList$?: Observable<Neighbor[] | undefined>;
  private readonly unsubscribe: Subject<void> = new Subject<void>();
  bttnAction = signal(CONFIGS.bttnActions.null);

  constructor(
    private store: Store<CountriesState>,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => this.store.dispatch(storeSelectedCca3(Object.values(params)[0].cca3)))
    this.currentCountry$ = this.store.pipe(
      select(selectCountryByCca3),
      filter(country => !!country),
      takeUntil(this.unsubscribe)
    );
    this.neighborhoodList$ = this.store.pipe(
      select(selectNeighbours),
      takeUntil(this.unsubscribe)
    );
  }

  goBack(): void {
    this.bttnAction.set(CONFIGS.bttnActions.wentBack);
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
