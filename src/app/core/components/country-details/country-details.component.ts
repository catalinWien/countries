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
  currentCountry: Country;
  currencies: string;
  languages: string;
  displayNeighborhoodList: Neighbor[];

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
        this.currentCountry = country[0];
        this.displayNeighborhoodList = [];
        this.currentCountry = {
          ...country[0],
          currencies: this.getFirstElement(country[0].currencies),
          languages: this.getFirstElement(country[0].languages)
        };

        if (this.currentCountry.borders && this.currentCountry.borders.length > 0) {
          this.currentCountry.borders.map(neighborResult => {
            let neighbor: Neighbor;

            this.countriesRestService.getCountryDetails(neighborResult).subscribe(neighborDetails => {
              if (neighborDetails[0]) {
                neighbor = {cca3: neighborDetails[0].cca3, name: neighborDetails[0].name.official};
                this.displayNeighborhoodList = [...this.displayNeighborhoodList, neighbor];
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

  private convertArrayToString(arrayToConvert: any[]): Object | string {
    let subArray: string[] = [];

    arrayToConvert.map(elem => {
      subArray = (subArray && subArray.length === 0) ? [elem.name] : [...subArray, elem.name];
    });

    return subArray.toString();
  }

  private getFirstElement(currentObject: Object): string {
    const firstKey = Object.keys(currentObject)[0];

    return currentObject[firstKey];
  }

  goBack(): void {
    const url = '/';

    this.router.navigate([url]);
  }

  goToNeighbor(cca3: string): void {
    const url = '/country/' + cca3;

    this.router.navigate([url]);
  }
}
