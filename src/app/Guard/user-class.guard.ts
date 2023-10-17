// 


import { Injectable,inject } from '@angular/core';
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
class userClassGuard
{
  
  constructor(private router:Router,private authservice:AuthService){
    
  }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ):boolean
     {
      const manager=localStorage.getItem("role");
      const user=localStorage.getItem("role1");
      console.log("managerau",manager)
      console.log("managerau",user)

      
      if(this.authservice.isAuthenticated1()  && user!=null){
        localStorage.removeItem('role');

        return true;
      }
       else{
        alert("access denied");
        localStorage.removeItem('role1');

        localStorage.removeItem('token');
        this.router.navigate(['/login']);
        return false;
       }
      
    }
  }
    export const isuserguard:CanActivateFn=( route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot):boolean=>
      {

        return inject(userClassGuard).canActivate(route,state);

      }
  


 

