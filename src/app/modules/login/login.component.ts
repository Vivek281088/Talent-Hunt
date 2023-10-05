import { Component } from '@angular/core';

import { ManagernameService } from 'src/app/services/managername.service';

import { Router } from '@angular/router';

import { LoginService } from 'src/app/services/login.service';

import { AuthService } from 'src/app/Guard/auth.service';

 

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
  finalizedName !: string;
  userEmail !: string;
  

 
  constructor(private router: Router,
    private loginservice:LoginService,
    private authService:AuthService,
    private managernameService: ManagernameService
    
    ) {}

 
ngOnInit(){
  history.pushState(null,'','') 
  // this.showCandidateName = this.managernameService.getManagerName();
 

}
  sign() {
   
    this.loginservice.postlogincredentials(this.userEmail,this.password).subscribe((data)=>{
      console.log("authenticate",data);
     this.managernameService.setCandidateAssessment_Email(this.userEmail);
    //  console.log("a",a)
      if(data.status==200){
        localStorage.setItem("localuserdata",JSON.stringify(data))
        if(data.role=="manager"){
          this.authService.login().subscribe(() => {
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
          this.authService.login().subscribe(() => {
            if (this.authService.isLoggedIn) {
              const redirectUrl = this.authService.redirectUrl
                ? this.authService.redirectUrl
                : '/candidateassessment';
              this.router.navigate(['candidateassessment']);
            }
          });
       
        }
      }
      else{
        alert(data.message);
      }

    })

  
      
  
    
    
    
  }



    
    

  }

