import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

// Import the Theme enumeration and ThemeService from the service file
import { Theme, ThemeService } from './services/theme.service';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root', // Selector for the component
  templateUrl: './app.component.html', // HTML template file
  styleUrls: ['./app.component.css'], // CSS styles for the component
})
export class AppComponent implements OnInit {
  // Observable to store the current theme
  theme!: Observable<Theme>;

  // Constructor with injections of ThemeService and ApiService
  constructor(private themeService: ThemeService, private api: ApiService) {}

  ngOnInit(): void {
    // Assign the observable theme to the mode$ observable from the theme service
    this.theme = this.themeService.mode$;
  }

  // Method to toggle between light and dark themes
  toggleTheme() {
    // Call the toggleMode method from the theme service to switch themes
    this.themeService.toggleMode();
  }
}
