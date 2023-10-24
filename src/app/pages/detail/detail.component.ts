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

  country!: Country | undefined;
  borderCountries$!: Observable<Country>;

  // Constructor with injections of the ApiService and ActivatedRoute
  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const cca3 = this.route.snapshot.paramMap.get('cca3') || '';

      const country = this.api.getCountryByCca3(cca3);
      if (country) {
        this.country = country;
        this.country.borders = this.country.borders.map((cca3) =>
          this.api.getCountryNameByCca3(cca3)
        );
      } else {
        // Handle the situation when there's no country with the provided cca3 code
        // It could be showing an error message or redirecting to another page
        console.error('Country not found');
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

  // Function to navigate to the detail page of a bordering country
  goToBorderCountry(cca3: string) {
    this.router.navigate(['/country', cca3]);
  }

  // }
  // function getObjectValues(obj: Record<string, any>): any[] {
  //   const values = [];
  //   for (const key in obj) {
  //     if (obj.hasOwnProperty(key)) {
  //       values.push(obj[key]);
  //     }
  //   }
  //   return values;
  // }
}
