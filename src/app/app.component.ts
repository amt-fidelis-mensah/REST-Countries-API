import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Theme, ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  theme!: Observable<Theme>;
  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.theme = this.themeService.mode$;
  }
  toggleTheme() {
    this.themeService.toggleMode();
  }
}
