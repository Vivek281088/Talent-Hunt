// import { CanActivateFn } from '@angular/router';

// export const loginGuard: CanActivateFn = (route, state) => {
//   return true;
// };
// codeeee
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AccountService } from './account.service';



@Injectable({ providedIn: 'root' })
class loginGuard  {
    constructor(
        private router: Router,
        private accountService: AccountService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.accountService.userValue;
        if (user) {
            // authorised so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// import { Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class loginGuard implements CanActivate {
//   constructor(private router: Router) {

//   }
//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//     const token = localStorage.getItem('token');
//     console.log(route);
//     console.log(state);
//     // const router = inject(Router);
//     console.log('Im in auth guard');
//     console.log('token', token);
//     if (token) {
//       return true;
//     } else {
//       this.router.navigate(['login']);
//       return false;
//     }
//     return true;
//   }

// }