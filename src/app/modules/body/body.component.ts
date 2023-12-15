import { Component, OnInit } from '@angular/core';
import { AppServiceService } from '../../app-service.service';
// import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
})
export class BodyComponent {
  showNavbar: boolean = true; // Initialize to true by default
  showNavbar1: boolean = true;
  showNavbar2: boolean = true;

  constructor(private service: AppServiceService, private router: Router) {
    // Subscribe to the route changes
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Get the URL segments
        const urlSegments = this.router.url.split('/');

        // Check if the last segment is 'login' to hide the navbar
        this.showNavbar = urlSegments[urlSegments.length - 1] !== 'login';
        this.showNavbar1 = urlSegments[urlSegments.length - 1] !== 'signup';
        this.showNavbar2 =
          urlSegments[urlSegments.length - 1] !== 'forgotpassword';
      }
    });
  }
  ngOnInit() {}
}
