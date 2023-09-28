import { Component } from '@angular/core';


import { Router } from '@angular/router';

import { LoginService } from 'src/app/services/login.service';

 

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
  constructor(private router: Router,
    private loginservice:LoginService) {}

 

  Sign() {
    // if(this.name ==null){
    //   this.nameinvalid="Please enter the name";
    //   //alert("please enter the name")
    // }
    // else if(this.password==null){
    //   alert("please enter password")
    // }
    // else{
    
    
    this.loginservice.postlogincredentials(this.name,this.password).subscribe((data)=>{
      console.log("authenticate",data);
     
      if(data.status==200){
        localStorage.setItem("localuserdata",JSON.stringify(data))
        if(data.role=="manager"){
          this.router.navigate(['dashboard'])
        }
        else if(data.role=="user"){
          this.router.navigate(['signup'])
        }
      }
      else{
        alert(data.message);
      }

    })
  }


    
    // this.router.navigate(['dashboard']);

  }

// }