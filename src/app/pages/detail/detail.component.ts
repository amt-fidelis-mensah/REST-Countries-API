import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, mergeMap, of, tap } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { Country } from 'src/app/types/api';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  // Observable for the main country details
  country$!: Observable<Country | null>;

  // Observable for the main country details
  borderCountries$!: Observable<Country[]>;

  // Constructor with injections of the ApiService and ActivatedRoute
  constructor(private api: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Subscribe to route params to get the country name
    this.route.params.subscribe((params) => {
      this.country$ = this.api.getCountryByName(params.country).pipe(
        tap((res) => console.log(res)),
        mergeMap((res) => {
          // Check if res.borders is defined before using it
          if (res.borders) {
            this.borderCountries$ = this.api
              .getCountriesByCodes(res.borders)
              .pipe(
                catchError((error) => {
                  console.error('Error fetching border countries:', error);
                  return of([]); // Provide a default value or behavior in case of an error
                })
              );
          } else {
            // Handle the case where borders is undefined
            this.borderCountries$ = of([]);
          }
          return of(res);
        }),
        catchError((error) => {
          console.error('Error fetching country by name:', error);
          return of(null); // Provide a default value or behavior in case of an error
        })
      );
    });
  }

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
  displayLanguages(languages: { [key: string]: string }) {
    return Object.values(languages)
      .map((item) => item)
      .join(', ');
  }
}
