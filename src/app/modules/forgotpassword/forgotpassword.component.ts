import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';



@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss'],
  providers: [MessageService]

})
export class ForgotpasswordComponent {
  name!:string;
  emailId!:string;
  // phoneNumber:number | null = null;
  password!:string;
  confirmPassword!:string;
constructor(private loginservice:LoginService,private messageservice:MessageService,private router:Router){

}
  forgotpassword(){
    this.loginservice.postforgotpassword(this.name,this.emailId,this.password,this.confirmPassword).subscribe((data)=>{

      console.log("data",data)
      if(data.status==404 && data.status!=200){
        // alert("error")
        //toast.success('please check password and confirm password are same','success');
         this.messageservice.add({ severity: 'error', summary: 'check password and confirm-password', detail: '' });
       }
       else if(data.status==200){
         this.messageservice.add({ life: 500000,severity: 'error', summary: 'User not Exist', detail: '' });
          
       }
       else{
        this.router.navigate(['login']);
       }

    })
    
  }
}
