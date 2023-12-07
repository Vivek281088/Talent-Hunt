import { Component, OnDestroy } from '@angular/core';
 
import { ManagernameService } from 'src/app/services/managername.service';
 
import { Router } from '@angular/router';
 
import { AuthService } from 'src/app/Guard/auth.service';
// import { AuthClassGuard } from 'src/app/Guard/auth-class.guard';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
// import { OnDestroy } from '@angular/core';
 
import * as CryptoJS from 'crypto-js';
 
import { NgModule } from '@angular/core';
import { BackButtonDisableModule } from 'angular-disable-browser-back-button';
import { LoginService } from 'src/app/services/login.service';
 
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
  finalizedName!: string;
  userEmail!: string;
 
  encrypted_password!: string;
 
  constructor(
    private router: Router,
 
    private authService: AuthService,
    private managernameService: ManagernameService,
    private loginservice: LoginService,
    private messageservice: MessageService,
    private location: Location
  ) {}
  //  ) {}
 
  ngOnInit() {
    history.pushState(null, '', '');
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
 
  sign() {
    // const encryptionkey = '123456qwertyuio';
 
    // const iv = '  ';
 
    // const ciphertext = CryptoJS.AES.encrypt(this.password, encryptionkey, {
    //   iv: CryptoJS.enc.Base64.parse(iv),
 
    //   mode: CryptoJS.mode.CBC,
 
    //   padding: CryptoJS.pad.Pkcs7,
    // });
 
    // this.encrypted_password = ciphertext.toString();
 
    // console.log(this.encrypted_password);
 
    // console.log(this.userEmail);
 
    this.loginservice
      .postlogincredentials(this.userEmail, this.password)
      .subscribe((data) => {
        console.log('authenticatetoke', data.token);
 
        console.log('role', data.role);
 
        if (data.status == 200) {
          localStorage.setItem('token', data.token);
 
          if (data.role == 'manager') {
            //display manager name
            this.managernameService.setManagerName_Email(this.userEmail);
 
            localStorage.setItem('role', data.role);
 
            localStorage.setItem('userrole', 'manager');
 
            localStorage.setItem('managerEmail', this.userEmail);
 
            if (this.authService.isAuthenticated()) {
              const redirectUrl = this.authService.redirectUrl
                ? this.authService.redirectUrl
                : '/dashboard';
 
              this.router.navigate(['dashboard']);
            }
          } else if (data.role == 'user') {
            console.log("Entered USer role")
            this.managernameService.setCandidateAssessment_Email(
              this.userEmail
            );
 
            localStorage.setItem('role1', data.role);
            localStorage.setItem('userrole', 'user');
 
             localStorage.setItem('Candidateemail', this.userEmail);
 
            if (this.authService.isAuthenticated1()) {
              console.log("entered")
              const redirectUrl = this.authService.redirectUrl
                ? this.authService.redirectUrl
                : '/dashboard';
 
              this.router.navigate(['dashboard']);
            }
          }
        } else if (data.status == 400) {
          console.log("400 error")
          this.messageservice.add({
            severity: 'error',
            summary: 'User not Exist',
            detail: '',
          });
        } else {
          alert(data.message);
        }
      });
  }
  createNewAcc() {
    this.router.navigate(['signup']);
  }
}
 
