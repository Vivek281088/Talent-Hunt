import { Component, OnInit } from '@angular/core';
import { AppServiceService } from './app-service.service';
// import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
// import { AppServiceService } from './app-service.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'th';

  showNavbar: boolean = true; // Initialize to true by default

  constructor(private service: AppServiceService, private router: Router) {
    // Subscribe to the route changes
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Get the URL segments
        const urlSegments = this.router.url.split('/');

        // Check if the last segment is 'login' to hide the navbar
        this.showNavbar = urlSegments[urlSegments.length - 1] !== 'login';
      }
    });
  }
  ngOnInit() {}
}
