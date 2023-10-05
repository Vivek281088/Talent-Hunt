
import { inject } from '@angular/core';
import { Router ,CanActivateFn} from '@angular/router';

import { AuthService } from './auth.service';
import { state } from '@angular/animations';


// //const router=new Router();
// export const authGuard = () => {
//   const authService = inject(AuthService);
//   const router = inject(Router);



//   if (authService.isLoggedIn) {
//     return true;
//   }
//   // else if(){

//   // }
// else{
//   console.log("login value" , authService.isLoggedIn)
//   return router.parseUrl('/login');
//   //return false;

// }
  

  
// };
//demo
export const authGuard:CanActivateFn=(route,state)=>{
  const router=inject(Router);
  const service=inject(AuthService);
  const currentmenu=route.url[0].path;
  const a=localStorage.getItem("token")
  if(service.isLoggedIn){
    return true;
  }
  else{
    alert("access denied");
    router.navigate(['login'])
    return false;
  }

}
//demo end