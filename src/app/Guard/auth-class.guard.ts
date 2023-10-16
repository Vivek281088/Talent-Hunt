// import { Injectable } from '@angular/core';
// import {
//   ActivatedRouteSnapshot,
//   CanActivate,
//   Router,
//   RouterStateSnapshot,
//   UrlTree,
// } from '@angular/router';
// import { Observable } from 'rxjs';
// import { AuthService } from './auth.service';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthClassGuard implements CanActivate {
//   constructor(private router:Router,private authservice:AuthService){

//   }
//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ):
//     | Observable<boolean | UrlTree>
//     | Promise<boolean | UrlTree>
//     | boolean
//     | UrlTree {
// //  const user=this.authservice.isLoggedIn;
//  if (this.authservice.a) {
//   // authorised so return true
//   return true;
// }
// else{
//   alert("access denied");

//   this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
//   return false;
// }

// // not logged in so redirect to login page with the return url
// // th
//   }
// }
/////////////////////////////////////////////////////////////////////////////////////////////////////



import { Injectable, inject } from '@angular/core';

import {

  ActivatedRouteSnapshot,

  CanActivate,

  CanActivateFn,

  Router,

  RouterStateSnapshot,

  UrlTree,

} from '@angular/router';

import { Observable } from 'rxjs';

import { AuthService } from './auth.service';



@Injectable({

  providedIn: 'root',

})

class AuthClassGuard {



  constructor(private router: Router, private authservice: AuthService) {



  }



  canActivate(

    route: ActivatedRouteSnapshot,

    state: RouterStateSnapshot

  ): boolean {

    const manager = localStorage.getItem("role");

    const user = localStorage.getItem("role1");

    console.log("managerau", manager)

    console.log("managerau", user)





    if (this.authservice.isAuthenticated() && manager != null) {

      localStorage.removeItem('role1');

      return true;

    }

    else {

      alert("access denied");

      localStorage.removeItem('role');



      localStorage.removeItem('token');

      this.router.navigate(['/login']);

      // this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});



      return false;

    }



  }

}

export const isadminguard: CanActivateFn = (route: ActivatedRouteSnapshot,

  state: RouterStateSnapshot): boolean => {



  return inject(AuthClassGuard).canActivate(route, state);



}







