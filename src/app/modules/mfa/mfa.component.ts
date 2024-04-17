import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { NgOtpInputModule } from  'ng-otp-input';
import { FormControl } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-mfa',
  standalone:true,
  templateUrl: './mfa.component.html',
  styleUrls: ['./mfa.component.scss'],
  imports: [CommonModule,DialogModule ,CardModule,NgOtpInputModule,ButtonModule,HttpClientModule ]
  
})
export class MFAComponent implements OnInit{
  value : any;
  visible: boolean = true;
  token !:string;
  constructor(private http : HttpClient){}
  ngOnInit(): void {}
  onOtpChange(data:any){
    this.token = data;
  }
  verify() {
    try {
      
    } catch (error) {
      console.error('Error verifying TOTP', error);
    }
  }

}
