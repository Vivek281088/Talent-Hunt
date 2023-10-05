import { Component } from '@angular/core';


import { Router } from '@angular/router';

import { LoginService } from 'src/app/services/login.service';

import { AuthService } from 'src/app/Guard/auth.service';
import { AuthClassGuard } from 'src/app/Guard/auth-class.guard';

import * as CryptoJS from 'crypto-js';
 

@Component({

  selector: 'app-login',

 

  templateUrl: './login.component.html',

 

  styleUrls: ['./login.component.scss'],

})

export class LoginComponent {

  name!:string;
  password!:string;
  nameinvalid!:string;
  passwordinvalid!:string;
  encrypted_password!:string;

 
  constructor(private router: Router,
    private loginservice:LoginService,
    private authService:AuthService,
   ) {}

 
ngOnInit(){
  history.pushState(null,'','') 
}
forgotpassword(){
  this.router.navigate(['forgotpassword']);
}

  sign() 
  {

  //  this.encrypted_password=btoa(this.password);
  //  console.log(this.encrypted_password);
  const encryptionkey='123456qwertyuio';
  const iv='  ';
  const ciphertext=CryptoJS.AES.encrypt(this.password,encryptionkey,{
    iv:CryptoJS.enc.Base64.parse(iv),
    mode:CryptoJS.mode.CBC,
    padding:CryptoJS.pad.Pkcs7
  })
   this.encrypted_password=ciphertext.toString();
   console.log(this.encrypted_password);
    this.loginservice.postlogincredentials(this.name,this.encrypted_password).subscribe((data)=>{

      console.log("authenticate",data);
     
      if(data.status==200){
        // localStorage.setItem("token","true")
        if(data.role=="manager"){
          // localStorage.setItem('token',this.password)
          // this.authguard.canActivate().subscribe(()=>{
          //   if(true){

          //   }
          //   else{

          //   }
          // })
          this.authService.login1().subscribe(() => {
            if (this.authService.isLoggedIn) {
              const redirectUrl = this.authService.redirectUrl
                ? this.authService.redirectUrl
                : '/dashboard';
              this.router.navigate(['dashboard']);
            }
          });
           
          // this.router.navigate(['dashboard'])
        }
        else if(data.role=="user"){
          this.authService.login1().subscribe(() => {
            if (this.authService.isLoggedIn) {
              const redirectUrl = this.authService.redirectUrl
                ? this.authService.redirectUrl
                : '/candidateassessment';
              this.router.navigate(['candidateassessment']);
            }
          });
           
          // this.router.navigate(['candidateassessment'])
        }
      }
      else{
        alert(data.message);
      }

    })

  
      
  
    
    
    
  }

  // this.router.navigate(['signup']);
 
    
    

  }

