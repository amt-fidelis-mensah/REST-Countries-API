import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

// Import the ApiService for fetching country data and the Country type
import { ApiService } from 'src/app/services/api.service';
import { Country } from 'src/app/types/api';

// Define an array of region options for filtering
const REGION_OPTIONS = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  // Variable for the search filter input
  searchFilter!: string;
  // Variable for the region filter input
  regionFilter?: string;
  // Variable to store the source data of countries
  source!: Country[];
  // Array of region options for the filter dropdown
  regionOptions = REGION_OPTIONS;

  // injecting the ApiService
  constructor(private api: ApiService) {}

  ngOnInit(): void {
    // Fetch all countries from the API and store them in the 'source' variable
    this.api.getAllCountries().subscribe((countries) => {
      this.source = countries;
    });
  }

  // Getter for the filtered list of countries based on search and region filters
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
