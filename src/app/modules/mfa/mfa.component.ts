import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { NgOtpInputModule } from  'ng-otp-input';
import { FormControl } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { takeUntil, tap } from 'rxjs/operators';


@Component({
  selector: 'app-mfa',
  standalone:true,
  templateUrl: './mfa.component.html',
  styleUrls: ['./mfa.component.scss'],
  imports: [CommonModule,DialogModule ,CardModule,NgOtpInputModule,ButtonModule,HttpClientModule,ToastModule]

})
export class MFAComponent implements OnInit{

closeDialog() {
this.router.navigate(['/login'])
}
@ViewChild('verify') button !:ElementRef
  value : any;
  visible: boolean = true;
  token !:string;
  constructor(private http : HttpClient,private dataService:DataService,private router:Router, private messageservice:MessageService){

  }
  ngOnInit(): void {}
  onOtpChange(data:any){
    this.token = data;
  }


  verify() {
    try {

      const emailId: string | null = localStorage.getItem('managerEmail');

      this.dataService.verifyMFA(emailId,this.token).subscribe((data)=>{
        console.log("Verify code",data)
        if(data){
          this.router.navigate(['/thdashboard'])
        }
        else{
          this.messageservice.add({
            severity: 'error',
            summary: 'Please Enter Valid OTP',
            detail: '',
          });

          return;
          // this.router.navigate(['/login'])
        }
      })
    } catch (error) {
      console.error('Error verifying TOTP', error);
    }
  }
  // onEnterKey(){

  //   this.verify();
  // }

  onEnterKey() {
    if(this.token.length==6)
     {

      this.verify()
    }
  }


}

