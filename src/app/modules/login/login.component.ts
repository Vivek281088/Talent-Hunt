import { Component } from '@angular/core';

import { ManagernameService } from 'src/app/services/managername.service';

import { Router } from '@angular/router';

import { LoginService } from 'src/app/services/login.service';

import { AuthService } from 'src/app/Guard/auth.service';
// import { AuthClassGuard } from 'src/app/Guard/auth-class.guard';
import { MessageService } from 'primeng/api';



import * as CryptoJS from 'crypto-js';
 

@Component({

  selector: 'app-login',

 

  templateUrl: './login.component.html',

 

  styleUrls: ['./login.component.scss'],

})

export class LoginComponent {
  showNavbar: boolean = false;
  name!:string;
  password!:string;
  nameinvalid!:string;
  passwordinvalid!:string;
  finalizedName !: string;
  userEmail !: string;
  
  encrypted_password!:string;

 
  constructor(private router: Router,
    private loginservice:LoginService,
    private authService:AuthService,
    private managernameService: ManagernameService,
    private messageservice:MessageService
  
    ) {}
  //  ) {}

 
ngOnInit(){
  history.pushState(null,'','') 
  // this.showCandidateName = this.managernameService.getManagerName();
 

}
forgotpassword(){
  this.router.navigate(['forgotpassword']);
}

  sign() 
  {
   
  
  const encryptionkey='123456qwertyuio';
  const iv='  ';
  const ciphertext=CryptoJS.AES.encrypt(this.password,encryptionkey,{
    iv:CryptoJS.enc.Base64.parse(iv),
    mode:CryptoJS.mode.CBC,
    padding:CryptoJS.pad.Pkcs7
  })
   this.encrypted_password=ciphertext.toString();
   console.log(this.encrypted_password);
   console.log(this.userEmail)

    this.loginservice.postlogincredentials(this.userEmail,this.encrypted_password).subscribe((data)=>{

      console.log("authenticatetoke",data.token);
      console.log("role",data.role)
     this.managernameService.setCandidateAssessment_Email(this.userEmail);
    
      if(data.status==200)
      {
        localStorage.setItem('token', data.token);
       
       
        
        if(data.role=="manager"){
          localStorage.setItem('role',data.role);
       
          if(this.authService.isAuthenticated()){
            const redirectUrl = this.authService.redirectUrl
                ? this.authService.redirectUrl
                : '/dashboard';
              this.router.navigate(['dashboard']);
          }
          
           
          
        }
        else if(data.role=="user"){
          localStorage.setItem("role1",data.role);
          if(this.authService.isAuthenticated1()){
            const redirectUrl = this.authService.redirectUrl
                ? this.authService.redirectUrl
                : '/candidateassessment';
              this.router.navigate(['candidateassessment']);
          }
       
        }
      }
      else if(data.status==400){
        this.messageservice.add({ severity: 'error', summary: 'User not Exist', detail: '' });
         
      }
      
      else{
        alert(data.message);
      }

    })

  
      
  
    
    
    
  

 
    
    
    
  }
};
