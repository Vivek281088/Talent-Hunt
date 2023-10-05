// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   constructor() { }
// }
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = false;
   a:boolean=false;

  // store the URL so we can redirect after logging i
  redirectUrl: string | null = null;

  login1(): Observable<boolean> {
    localStorage.setItem("token","true");

    console.log("Login Called")
    return of(true).pipe(

      delay(1000),
      tap(() => (this.isLoggedIn= true))
    );
  }
  // login2():Observable<boolean>{
  //   this.a=true
  //   return of(true)
    
  //  // return true;
  // }
logout(){
   return false;
 }
}
