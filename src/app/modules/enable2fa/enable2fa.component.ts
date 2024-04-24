import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { Clipboard } from '@angular/cdk/clipboard';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enable2fa',
  standalone: true,
  imports: [CommonModule, CardModule, ReactiveFormsModule, DialogModule, ButtonModule,FormsModule],
  templateUrl: './enable2fa.component.html',
  styleUrls: ['./enable2fa.component.scss'],
})
export class Enable2faComponent {

  twofactvisible: boolean = true;
  showTick: boolean= false;
  subscription!: Subscription;
  message!: any;
  imageSource!:string;
  secretKey!:string;
  token!:string

  constructor(
    private clipboard: Clipboard,
    private router : Router,
    private dataService:DataService
  
  
  ) {}

  ngOnInit() {
    this.message = this.dataService.getSighupdata()
    console.log("message received from signup",this.message);
    this.createQrCode();
    
  }

  verifyNow()
  {
    const date= Date.now();
    const id = new Date(date)
    this.dataService.signupWithMFA(id,this.message.firstName,this.message.lastName,this.message.emailId,
      this.message.phoneNumber,this.message.password,this.message.confirmPassword,this.token,this.secretKey).subscribe(
        {
          next : (response) => {
            console.log(response)
            this.router.navigate(['login'])
          },
          error : (error) => {
            console.log(error)
          }
        }
      )
  }
  createQrCode()
  {
    this.dataService.createQR(this.message.emailId).subscribe((response) => {
      this.imageSource=response.imageSrc;
      this.secretKey=response.secretKey
      console.log('emailid created....',response);
    });
  }


  cancelButton() {
    this.twofactvisible = false;
  }
  copyToClipboard(text: string) {
    this.clipboard.copy(text);
    this.showTick = true; 
    console.log("showTick set to true"); 
        setTimeout(() => {
      this.showTick = false; 
      console.log("showTick set to false");
    }, 1500); 
  }

}