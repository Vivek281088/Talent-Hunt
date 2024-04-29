import { Component, ComponentFactoryResolver, OnDestroy, ViewChild, ViewContainerRef } from '@angular/core';

import { ManagernameService } from 'src/app/services/managername.service';

import { Router } from '@angular/router';

import { AuthService } from 'src/app/Guard/auth.service';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { LoginService } from 'src/app/services/login.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MFAComponent } from '../mfa/mfa.component';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy {
 // @ViewChild('dynamicComponentContainer', { read: ViewContainerRef }) dynamicComponentContainer!: ViewContainerRef;
  showNavbar: boolean = false;
  name!: string;
  password!: string;
  nameinvalid!: string;
  passwordinvalid!: string;
  finalizedName!: string;
  userEmail!: string;

  encrypted_password!: string;
  loginForm!: FormGroup;
  formSubmitted:boolean=false

  constructor(
    private resolver:ComponentFactoryResolver,
    private router: Router,
    private authService: AuthService,
    private managernameService: ManagernameService,
    private loginservice: LoginService,
    private messageservice: MessageService,
    private location: Location,
    private fb: FormBuilder,
  ) {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required

      ]],
      password: ['', [Validators.required]],



    });
  }
  //  ) {}

  ngOnInit() {
    sessionStorage.setItem('Component-Name', 'home');

  }
  ngOnDestroy(): void {

  }
  forgotpassword() {
    this.router.navigate(['resetpassword']);
  }

  sign() {
console.log("inside sign in")
    this.formSubmitted = true;
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      console.log('Form Data:', formData);
      const hashedPassword = CryptoJS.SHA256(formData.password).toString();
      console.log('Hash Password:', hashedPassword);
    this.loginservice
      .postlogincredentials(formData.userName, hashedPassword)
      .subscribe((data) => {

        console.log('role', data);
        console.log(data)
        if (data.status == 200) {
          localStorage.setItem('token', data.token);
          console.log('Token-', data.token);

          if (data.role == 'manager') {

            //display manager name
            this.managernameService.setManagerName_Email(formData.userName);

            localStorage.setItem('role', data.role);

            localStorage.setItem('userrole', 'manager');

            localStorage.setItem('managerEmail', formData.userName);

            if (this.authService.isAuthenticated()) {

             // const factory=this.resolver.resolveComponentFactory(MFAComponent);
             //console.log("factory",factory);
            //  const mfaComponentReference=this.dynamicComponentContainer.createComponent(factory)
              // const redirectUrl = this.authService.redirectUrl
              //   ? this.authService.redirectUrl
              //   : '/dashboard';  //not in use
            //  this.router.navigate(['/thdashboard']);
              this.router.navigate(['/verifymfa']);
            }`  `
          } else if (data.role == 'user') {
            console.log("inside else if")
            console.log("Entered USer role")
            localStorage.setItem('candidateEmail', formData.userName);
            this.managernameService.setCandidateAssessment_Email(
              formData.userName
            );

            localStorage.setItem('role1', data.role);
            localStorage.setItem('userrole', 'user');

             localStorage.setItem('Candidateemail', formData.userName);

            if (this.authService.isAuthenticated1()) {
              console.log("entered")
              const redirectUrl = this.authService.redirectUrl
                ? this.authService.redirectUrl
                : '/candidatehome';

              this.router.navigate(['candidatehome']);
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
          this.messageservice.add({
            severity: 'error',
            summary: 'Invalid Credentials! Try Again',
            detail: '',
          });
        }
      });
  }else{
    console.log("invalid form");

  }
  }
  onEnterKey() {
    if (this.loginForm.valid) {
      this.sign()
    }
  }

createNewAcc() {
    this.router.navigate(['/signup']);
  }
}
