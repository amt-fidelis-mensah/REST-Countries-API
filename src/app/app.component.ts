import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Theme, ThemeService } from './services/theme.service';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  theme!: Observable<Theme>;
  constructor(private themeService: ThemeService, private api: ApiService) {}

  ngOnInit(): void {
    this.theme = this.themeService.mode$;
  }
  toggleTheme() {
    this.themeService.toggleMode();
  }
}
