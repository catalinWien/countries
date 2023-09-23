import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';

import { CONFIGS } from '@configs/configs';

@Component({
  standalone: true,
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [ CommonModule, MatToolbarModule]
})
export class HeaderComponent {
  configs = CONFIGS;
}
