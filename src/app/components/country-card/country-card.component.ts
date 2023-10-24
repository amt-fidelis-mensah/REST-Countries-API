import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
// Import the Country type from the API types
import { Country } from 'src/app/types/api';

@Component({
  selector: 'app-country-card',
  templateUrl: './country-card.component.html',
  styleUrls: ['./country-card.component.css'],
})
export class CountryCardComponent {
  // Input property to receive country data from the parent component
  @Input()
  country!: Country;
  constructor(private router: Router) {}

  goToCountryDetail() {
    this.router.navigate(['/country', this.country.cca3]);
  }
}
