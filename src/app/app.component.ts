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
  showNavbar1: boolean = true; 
  showNavbar2: boolean = true; 
  showNavbar3: boolean = true; 


  constructor(private service: AppServiceService, private router: Router) {
    // Subscribe to the route changes
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Get the URL segments
        const urlSegments = this.router.url.split('/');

        // Check if the last segment is 'login' to hide the navbar
        // this.showNavbar3 = urlSegments[urlSegments.length - 1] !== '4200';
       
        this.showNavbar = urlSegments[urlSegments.length - 1] !== 'login';
        this.showNavbar1 = urlSegments[urlSegments.length - 1] !== 'signup';
        this.showNavbar2 = urlSegments[urlSegments.length - 1] !== 'forgotpassword';


      }
    });
  }
  ngOnInit() {}
}
