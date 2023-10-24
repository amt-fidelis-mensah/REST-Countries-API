// Import necessary modules from Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs';

// Import necessary types
import { Country, CountryResponse } from '../types/api';
import { map } from 'rxjs';

// Injectable decorator to indicate that this service should be provided at the root level
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  countries = new BehaviorSubject<Country[]>([]);
  filteredCountries = new BehaviorSubject<Country[]>([]);

  // Store fetched countries
  private allCountries: Country[] = [];

  // URL for the Rest Countries API
  api: string = 'https://restcountries.com/v3.1/all';

  // Injecting the HttpClient service
  constructor(private http: HttpClient) {}

  // Method to fetch all countries from the API
  getAllCountries(): Observable<Country[]> {
    // If countries are already fetched, return them
    if (this.allCountries.length > 0) {
      return of(this.allCountries);
    }
    // Otherwise, fetch from API
    else {
      return this.http.get<Country[]>(this.api).pipe(
        tap((response: Country[]) => (this.allCountries = response)) // store fetched countries.
      );
    }
  }

  getCountryByCca3(cca3: string): Country | undefined {
    return this.allCountries.find((country) => country.cca3 === cca3);
  }

  getCountryNameByCca3(cca3: string): string {
    const country = this.allCountries.find((country) => country.cca3 === cca3);
    return country ? country.name.common : '';
  }
}
