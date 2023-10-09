// Import necessary modules from Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Import necessary types
import { Country } from '../types/api';
import { map } from 'rxjs';

// Injectable decorator to indicate that this service should be provided at the root level
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // URL for the Rest Countries API
  private api = 'https://restcountries.com/v3.1';

  // Injecting the HttpClient service
  constructor(private http: HttpClient) {}

  // Method to fetch all countries from the API
  getAllCountries() {
    return this.http.get<Country[]>(`${this.api}/all`);
  }

  // Method to fetch a country by name from the API
  getCountryByName(name: string) {
    return this.http
      .get<Country[]>(`${this.api}/name/${name}`)
      .pipe(map(([res]) => res));
  }

  // Method to fetch countries by their codes name from the API
  getCountriesByCodes(codes: string[]) {
    return this.http.get<Country[]>(
      `${this.api}/alpha?codes=${codes.join(',')}`
    );
  }
}
