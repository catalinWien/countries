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
        this.currentCountry = country;
        this.displayNeighborhoodList = [];

        if (this.currentCountry?.borders && this.currentCountry.borders.length > 0) {
          this.currentCountry.borders.map(neighborResult => {
            if (neighborResult) {
              let neighbor: Neighbor;
  
              this.countriesRestService.getCountryDetails(neighborResult).subscribe(neighborDetails => {
                if (neighborDetails) {
                  neighbor = {cca3: neighborDetails.cca3, name: neighborDetails.name.official};
                  this.displayNeighborhoodList = [...this.displayNeighborhoodList!, neighbor];
                }
              },
              error => {
                console.log(error);
              });
            }
          });
        }
      }
    },
    error => {
      console.log(error);
    });
  }
}
