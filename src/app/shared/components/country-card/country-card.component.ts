import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Country } from '@models/country';
import { MatCardModule } from '@angular/material/card';

@Component({
  standalone: true,
  selector: 'country-card',
  templateUrl: './country-card.component.html',
  styleUrls: ['./country-card.component.scss'],
  imports: [ CommonModule, MatCardModule ]
})
export class CountryCardComponent {
  @Input() country?: Country;
}
