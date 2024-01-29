import { Component } from '@angular/core';
 
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss'],
  providers: [MessageService],
})
export class ResetpasswordComponent {
  resetForm!: FormGroup;
  formSubmitted: boolean = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private loginservice: LoginService,
    private messageService: MessageService
  ) {
    this.resetForm = this.fb.group({
      emailId: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-zA-Z0-9._%+-]+@gmail.com$'),
        ],
      ],

      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, this.passwordMatchValidator]],
    });
  }

  ngOnInit() {}
  private passwordMatchValidator(control: AbstractControl) {
    const password: string = control.get('password')?.value;
    const confirmPassword: string = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  reset() {
    this.formSubmitted = true;
    this.loginservice
      .postforgotpassword(
        this.resetForm.value.emailId,
        this.resetForm.value.password,
        this.resetForm.value.confirmPassword
      )
      .subscribe((data) => {
        console.log('data', data);
        this.showUpdateMessage();
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1000);
      });
  }
  showUpdateMessage() {
    this.messageService.add({
      severity: 'success',

      summary: 'Success',

      detail: 'Password Updated Successfully',
    });
  }
  login() {
    this.router.navigate(['login']);
  }
}
 
