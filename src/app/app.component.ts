import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  themeChanged: boolean;

  constructor() {}

  ngOnInit(): void {
    this.themeChanged = false;
  }

  changeTheme(): void {
    this.themeChanged = !this.themeChanged;
  }
}
