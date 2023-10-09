import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthClassGuard implements CanActivate {
  constructor(private router:Router,private authservice:AuthService){
    
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
//  const user=this.authservice.isLoggedIn;
 if (this.authservice.a) {
  // authorised so return true
  return true;
}
else{
  alert("access denied");

  this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
  return false;
}

// not logged in so redirect to login page with the return url
// th
  }
}
