import { Component } from '@angular/core';

// Import the ThemeService to handle theme-related functionality
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-header', // Selector for the component
  templateUrl: './header.component.html', // HTML template file
  styleUrls: ['./header.component.css'], // CSS styles for the component
})
export class HeaderComponent {
  // injecting the ThemeService
  constructor(private themeService: ThemeService) {}

  // Method to toggle between light and dark themes
  toggleTheme() {
    // Call the toggleMode method from the theme service to switch themes
    this.themeService.toggleMode();
  }
}
