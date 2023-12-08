import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [MessageService]
})
export class SignupComponent {
  Firstname!:string;
  Lastname!:string;
  emailId!:string;
  phoneNumber:number | null = null;
  password!:string;
  confirmPassword!:string;
  visible: boolean = false;
  constructor(private loginservice:LoginService,private toastr:ToastrService,private messageService: MessageService,private router:Router){
  }
  resetform(){
    this.Firstname='';
    this.Lastname='';
    this.emailId='';
    this.phoneNumber=null;
    this.password='';
    this.confirmPassword='';

  }
  id!: Date;
  signup() {
     const date = Date.now();
     this.id = new Date(date);
    this.loginservice.postsignup(this.id,this.Firstname,this.Lastname,this.emailId,this.phoneNumber,this.password,this.confirmPassword).subscribe((data)=>{

      // console.log("ds",data)  
      // console.log("ps",this.password)
       console.log("cp",data.status)    
      if(data.status==404){
       // alert("error")
       //toast.success('please check password and confirm password are same','success');
        this.messageService.add({ severity: 'error', summary: 'check password and confirm-password', detail: '' });
      }
    
      else{
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
         this.resetform();
         this.router.navigate(['login'])
         
      }
    })
  }

  showDialog(){
    this.visible = true;
  }

  alreadyhasaccount() {
    this.router.navigate(['login']);
  }


}
