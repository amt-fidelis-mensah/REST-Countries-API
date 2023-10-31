import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, merge, mergeMap, of, tap } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { Country } from 'src/app/types/api';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  // // Observable for the main country details
  // country$!: Observable<Country | null>;

  // // Observable for the main country details
  // borderCountries$!: Observable<Country[]>;

  country: Country | undefined;
  borderCountries: Country[][] = [];

  // Constructor with injections of the ApiService and ActivatedRoute
  constructor(private api: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const countryName = params.country;

      // Assign the result directly to 'country'
      this.country = this.api.getCountryByName(countryName);
      // Initialize borderCountries as an empty array
      this.borderCountries = [];

      // Get the cca3 of the main country
      const borders = this.country?.borders;

      // Get the border countries based on the cca3
      if (borders) {
        for (const borderCca3 of borders) {
          const borderCountry = this.api.getCountryNameByCca3(borderCca3);
          if (borderCountry) {
            this.borderCountries.push(borderCountry);
          }
        }
      }
    });
  }

  // Subscribe to route params to get the country name

  // Functions to display native names, currencies and languages in a correct format

  displayNativeName(nativeName: {
    [key: string]: { official: string; common: string };
  }) {
    return Object.values(nativeName)
      .map((item) => item.common)
      .join(', ');
  }

  displayCurrencies(currencies: {
    [key: string]: { name: string; symbol: string };
  }) {
    return Object.values(currencies)
      .map((item) => item.name)
      .join(', ');
  }
  displayLanguages(languages: { [key: string]: string } = {}) {
    return Object.values(languages)
      .map((item) => item)
      .join(', ');
  }
}
