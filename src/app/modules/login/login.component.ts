import { Component, OnDestroy } from '@angular/core';

import { ManagernameService } from 'src/app/services/managername.service';

import { Router } from '@angular/router';

import { LoginService } from 'src/app/services/login.service';

import { AuthService } from 'src/app/Guard/auth.service';
// import { AuthClassGuard } from 'src/app/Guard/auth-class.guard';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
// import { OnDestroy } from '@angular/core';


import * as CryptoJS from 'crypto-js';

import { NgModule } from '@angular/core';
import { BackButtonDisableModule } from 'angular-disable-browser-back-button';



@Component({

  selector: 'app-login',



  templateUrl: './login.component.html',



  styleUrls: ['./login.component.scss'],

})


export class LoginComponent implements OnDestroy {
  showNavbar: boolean = false;
  name!: string;
  password!: string;
  nameinvalid!: string;
  passwordinvalid!: string;
  finalizedName !: string;
  userEmail !: string;

  encrypted_password!: string;


  constructor(private router: Router,
    private loginservice: LoginService,
    private authService: AuthService,
    private managernameService: ManagernameService,
    private messageservice: MessageService,
    private location: Location

  ) { }
  //  ) {}


  ngOnInit() {
    history.pushState(null, '', '')
    // this.showCandidateName = this.managernameService.getManagerName();
    window.addEventListener('popstate', () => {
      this.location.forward();
    });


  }
  ngOnDestroy(): void {
    window.removeEventListener('popstate', () => {
      this.location.forward();
    });
  }
  forgotpassword() {
    this.router.navigate(['forgotpassword']);
  }

  // sign() 
  // {

  //   // this.loginservice.postlogincredentials(this.userEmail,this.password).subscribe
  //   // ((data)=>
  //   // {

  // //  this.encrypted_password=btoa(this.password);
  // //  console.log(this.encrypted_password);
  // const encryptionkey='123456qwertyuio';
  // const iv='  ';
  // const ciphertext=CryptoJS.AES.encrypt(this.password,encryptionkey,{
  //   iv:CryptoJS.enc.Base64.parse(iv),
  //   mode:CryptoJS.mode.CBC,
  //   padding:CryptoJS.pad.Pkcs7
  // })
  //  this.encrypted_password=ciphertext.toString();
  //  console.log(this.encrypted_password);
  //  console.log(this.userEmail)
  //  console.log("hi", this.password)

  //   this.loginservice.postlogincredentials(this.userEmail,this.encrypted_password).subscribe((data)=>{

  //     console.log("authenticate rolee",data.role);
  //    this.managernameService.setCandidateAssessment_Email(this.userEmail);
  //    localStorage.setItem("role",data.role)

  //   //  console.log("a",a)
  //     if(data.status==200)
  //     {
  //       // localStorage.setItem("token","true")
  //       if(data.role=="manager"){

  //         this.authService.login1().subscribe(() => {
  //           if (this.authService.isLoggedIn) {
  //             this.router.navigate(['dashboard']);
  //           }
  //         });


  //       }
  //       else if(data.role=="user"){
  //         this.authService.login1().subscribe(() => {
  //           if (this.authService.isLoggedIn) {
  //             this.router.navigate(['dashboard']);
  //           }
  //         });

  //       }
  //     }
  //     else if(data.status==400){
  //       this.messageservice.add({ severity: 'error', summary: 'Invalid Credentials', detail: '' });

  //     }

  //     else{
  //       alert(data.message);
  //     }

  //   })













  // }
  ///////////////////////////////////////////////////////////////////////////////////////////




  sign() {





    const encryptionkey = '123456qwertyuio';

    const iv = '  ';

    const ciphertext = CryptoJS.AES.encrypt(this.password, encryptionkey, {

      iv: CryptoJS.enc.Base64.parse(iv),

      mode: CryptoJS.mode.CBC,

      padding: CryptoJS.pad.Pkcs7

    })

    this.encrypted_password = ciphertext.toString();

    console.log(this.encrypted_password);

    console.log(this.userEmail)



    this.loginservice.postlogincredentials(this.userEmail, this.encrypted_password).subscribe((data) => {



      console.log("authenticatetoke", data.token);

      console.log("role", data.role)

      this.managernameService.setCandidateAssessment_Email(this.userEmail);



      if (data.status == 200) {

        localStorage.setItem('token', data.token);







        if (data.role == "manager") {

          localStorage.setItem('role', data.role);

          localStorage.setItem("userrole", "manager");


          if (this.authService.isAuthenticated()) {

            const redirectUrl = this.authService.redirectUrl

              ? this.authService.redirectUrl

              : '/dashboard';

            this.router.navigate(['dashboard']);

          }







        }

        else if (data.role == "user") {

          localStorage.setItem("role1", data.role);
          localStorage.setItem("userrole", "user");

          if (this.authService.isAuthenticated1()) {

            const redirectUrl = this.authService.redirectUrl

              ? this.authService.redirectUrl

              : '/dashboard';

            this.router.navigate(['dashboard']);

          }



        }

      }

      else if (data.status == 400) {

        this.messageservice.add({ severity: 'error', summary: 'User not Exist', detail: '' });



      }



      else {

        alert(data.message);

      }



    })



























  }


};
