



import { Injectable } from '@angular/core';

import { Router } from '@angular/router';



import { Observable, of } from 'rxjs';

import { tap, delay } from 'rxjs/operators';



@Injectable({

  providedIn: 'root',

})

export class AuthService {

  isLoggedIn = false;

  ismanager = false;

  isuser = false;

  constructor(private router: Router) {



  }





  // Add a property to store the user's role

  userRole: string = '';



  // Add a property to store the JWT token

  authToken: string | null = localStorage.getItem('authToken');







  redirectUrl: string | null = null;

  getToken(): string | null {

    return localStorage.getItem('token');

  }



  getrole(): string | null {

    return localStorage.getItem('role');

  }



  logout() {

    localStorage.removeItem('token');

    this.router.navigate(['/login']);

  }



  isAuthenticated(): boolean {





    const token = this.getToken();

    // return !!token;

    this.ismanager = true;

    if (token && this.ismanager) {

      return true;



    }

    else {

      // localStorage.removeItem('token');

      alert("access denied");

      this.router.navigate(['/login']);

      return false;





    }

  }



  isAuthenticated1(): boolean {





    const token = this.getToken();

    this.isuser = true;

    if (token && this.isuser) {

      return true;



    }

    else {

      // localStorage.removeItem('token');

      alert("access denied");



      this.router.navigate(['/login']);

      return false;



    }

  }





}

