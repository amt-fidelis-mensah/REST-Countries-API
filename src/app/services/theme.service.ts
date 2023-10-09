// Import necessary modules from Angular and RxJS
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// Define an enumeration for the available themes
export enum Theme {
  light = 'light',
  dark = 'dark',
}

// Injectable decorator to indicate that this service should be provided at the root level
@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  // BehaviorSubject to hold the current theme mode with an initial value of 'light'
  private mode: BehaviorSubject<Theme> = new BehaviorSubject<Theme>(
    Theme.light
  );

  // Constructor for the service
  constructor() {}

  // Getter for the mode BehaviorSubject as an observable
  get mode$() {
    return this.mode.asObservable();
  }

  // Method to toggle between light and dark modes
  toggleMode() {
    // Check the current mode value and switch to the opposite mode
    if (this.mode.value === Theme.dark) {
      this.mode.next(Theme.light);
    } else {
      this.mode.next(Theme.dark);
    }
  }
}
