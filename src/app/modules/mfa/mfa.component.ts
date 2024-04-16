import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { NgOtpInputModule } from  'ng-otp-input';
import { FormControl } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-mfa',
  standalone:true,
  templateUrl: './mfa.component.html',
  styleUrls: ['./mfa.component.scss'],
  imports: [CommonModule,DialogModule ,CardModule,NgOtpInputModule,ButtonModule  ]
  
})
export class MFAComponent implements OnInit{
  value : any;
  visible: boolean = true;
  otpInput = new FormControl();

  verificationCode = '';
  ngOnInit(): void {
    
  }

  onOtpChange(data:any){
    console.log("inside otpchange",this.otpInput);
    
  }

  async verifyTOTP() {
    let user;
    try {
      
    } catch (error) {
      console.error('Error verifying TOTP', error);
    }
  }

}
