import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { Country } from 'src/app/types/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  countries$!: Observable<Country[]>;
  searchFilter!: string;
  source!: Country[];

  constructor(private api: ApiService) {}
  ngOnInit(): void {
    this.api.getAllCountries().subscribe((countries) => {
      this.source = countries;
    });
  }

  get countries() {
    return this.source
      ? this.source.filter((country) =>
          this.searchFilter
            ? country.name.common
                .toLowerCase()
                .includes(this.searchFilter.toLowerCase())
            : country
        )
      : this.source;
  }
}
