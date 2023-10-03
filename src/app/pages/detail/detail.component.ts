import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, mergeMap, of, tap } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { Country } from 'src/app/types/api';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  country$!: Observable<Country>;
  borderCountries$!: Observable<Country[]>;

  constructor(private api: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.country$ = this.api.getCountryByName(params.country).pipe(
        tap((res) => console.log(res)),
        mergeMap((res) => {
          this.borderCountries$ = this.api.getCountriesByCodes(res.borders);
          return of(res);
        })
      );
    });
  }

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
