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

  constructor(private api: ApiService) {}
  ngOnInit(): void {
    this.countries$ = this.api.getAllCountries();
  }
}
