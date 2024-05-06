import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { NgOtpInputModule } from  'ng-otp-input';
import { FormControl } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
// import { ToastrService } from 'ngx-toastr';
import { ToastModule } from 'primeng/toast';



@Component({
  selector: 'app-mfa',
  standalone:true,
  templateUrl: './mfa.component.html',
  styleUrls: ['./mfa.component.scss'],
  imports: [CommonModule,DialogModule ,CardModule,NgOtpInputModule,ButtonModule,HttpClientModule,ToastModule ],
  providers:[MessageService]
  
})
export class MFAComponent implements OnInit{
  value : any;
  visible: boolean = true;
  token !:string;
  constructor(private http : HttpClient,private dataService:DataService,private router:Router,private messageservice:MessageService){
    
  }
  ngOnInit(): void {}
  onOtpChange(data:any){
    this.token = data;
  }
  verify() {
    try {
       console.log("entered try") 
      const emailId: string | null = localStorage.getItem('managerEmail');

      this.dataService.verifyMFA(emailId,this.token).subscribe((data)=>{
        console.log("Verify code",data)
        if(data){
          this.router.navigate(['/mtalent/thdashboard'])
        }
        else{
console.log("entered else")

          this.messageservice.add({
            severity: 'error',
            summary: 'Please Enter Valid OTP',
            detail: '',
          });
          
          return;
        }
      })
    } catch (error) {
      console.error('Error verifying TOTP', error);
    }
  }
  onEnterKey(){
    
    

    this.verify();
  }
}
