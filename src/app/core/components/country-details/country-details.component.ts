import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { Country, Neighbor } from '@core/models/countries';
import { CountriesRestService } from '@core/services/api-rest.service';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.scss']
})
export class CountryDetailsComponent implements OnInit {
  currentCountry: Country | undefined;
  currencies: string | undefined;
  languages: string | undefined;
  displayNeighborhoodList: Neighbor[] | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private countriesRestService: CountriesRestService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
        this.listCountryDetails(Object.values(params)[0].cca3);
      },
      error => {
        console.log(error);
      }
    );
  }

  listCountryDetails(cca3: string): void {
    this.countriesRestService.getCountryDetails(cca3).subscribe(country => {
      if (country) {
        this.currentCountry = Object.values(country)[0];
        this.displayNeighborhoodList = [];
        /*
        this.currentCountry = {
          ...country,
          currencies: country.currencies,
          languages: country.languages
        };
        */

        if (this.currentCountry?.borders && this.currentCountry.borders.length > 0) {
          this.currentCountry.borders.map(neighborResult => {
            let neighbor: Neighbor;

            this.countriesRestService.getCountryDetails(neighborResult).subscribe(neighborDetails => {
              const neighbourData = Object.values(neighborDetails)[0];
              if (neighbourData) {
                neighbor = {cca3: neighbourData.cca3, name: neighbourData.name.official};
                this.displayNeighborhoodList = [...this.displayNeighborhoodList!, neighbor];
              }
            },
            error => {
              console.log(error);
            });
          });
        }
      }
    },
    error => {
      console.log(error);
    });
  }
/*
  private convertArrayToString(arrayToConvert: any[]): Object | string {
    let subArray: string[] = [];

    arrayToConvert.map(elem => {
      subArray = (subArray && subArray.length === 0) ? [elem.name] : [...subArray, elem.name];
    });

    return subArray.toString();
  }
  */

  goBack(): void {
    const url = '/';

    this.router.navigate([url]);
  }

  goToNeighbor(cca3: string): void {
    const url = '/country/' + cca3;

    this.router.navigate([url]);
  }
}
