import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, Subscription } from 'rxjs';

// Import the ApiService for fetching country data and the Country type
import { ApiService } from 'src/app/services/api.service';
import { Country } from 'src/app/types/api';

// Define an array of region options for filtering
const REGION_OPTIONS = [
  'Africa',
  'Antarctic',
  'Americas',
  'Asia',
  'Europe',
  'Oceania',
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  searchFilter!: string;
  regionFilter!: string;
  source!: Country[];
  regionOptions = REGION_OPTIONS;

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit() {
    // Fetch all countries from the API and store them in the 'source' variable
    this.api.getAllCountries().subscribe((countries) => {
      this.source = countries;
    });
  }
  // goToCountryDetail(country: Country) {
  //   this.router.navigate(['/country', country.cca3]);
  // }
  get countries() {
    return this.source
      ? this.source
          .filter((country) =>
            this.searchFilter
              ? country.name.common
                  .toLowerCase()
                  .includes(this.searchFilter.toLowerCase())
              : country
          )
          .filter((country) =>
            this.regionFilter
              ? country.region.includes(this.regionFilter)
              : country
          )
      : this.source;
  }
}
