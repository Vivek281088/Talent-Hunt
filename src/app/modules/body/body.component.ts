import { Component, OnInit } from '@angular/core';
import { AppServiceService } from '../../app-service.service';
// import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
})
export class BodyComponent {
  showNavbar: boolean = true; 
  showNavbar1: boolean = true;
  showNavbar2: boolean = true;
  showNavbar3: boolean = true;
  hasError: boolean = true;

  constructor(private service: AppServiceService, private router: Router,private activatedRoute : ActivatedRoute) {
    // Subscribe to the route changes
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Get the URL segments
        const urlSegments = this.router.url.split('/');

        // Check if the last segment is 'login' to hide the navbar
        this.showNavbar = urlSegments[urlSegments.length - 1] !== 'login';
        this.showNavbar1 = urlSegments[urlSegments.length - 1] !== 'signup';
        this.showNavbar2 =urlSegments[urlSegments.length - 1] !== 'forgotpassword';
        this.showNavbar3 = urlSegments[urlSegments.length - 1] !== 'resetpassword';
        this.hasError = this.activatedRoute.snapshot.firstChild?.routeConfig?.path !== 'errorpage';
      }
    });
  }
  ngOnInit() {}
}
