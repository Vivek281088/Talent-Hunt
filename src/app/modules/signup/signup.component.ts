
import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Guard/auth.service';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [MessageService],
})
export class SignupComponent {
  passwordRequirements: string = '';
  Firstname!: string;
  Lastname!: string;
  emailId!: string;
  phoneNumber: number | null = null;
  password!: string;
  confirmPassword!: string;
  visible: boolean = false;
  signupForm: FormGroup;
  formSubmitted:boolean=false;
  
  constructor(
    private loginservice: LoginService,
    private toastr: ToastrService,
    private messageService: MessageService,
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder,

      ) {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]{10}$'), // Only allow exactly 10 numeric values
        ],
      ],    
      emailId: [
        '',
        [
          Validators.required,
          Validators.email, // Ensures it's a valid email format
          Validators.pattern('^[a-zA-Z0-9._%+-]+@gmail.com$'), // Ensures it's a gmail.com address
        ],
      ],
      
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, this.passwordMatchValidator]],
    });
    
  }
  ngOnInit() {}

  private passwordMatchValidator(control: AbstractControl) {
    const password: string = control.get('password')?.value; // Get the password from the form
    const confirmPassword: string = control.get('confirmPassword')?.value; // Get the confirm password from the form

    // Check if the password and confirm password match
    return password === confirmPassword ? null : { passwordMismatch: true };
  }
   
  initializeForm() {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.minLength(10)]],
      emailId: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, this.passwordMatchValidator]],
    });
  }


  hasValueInForm(): boolean {
    const formValues = this.signupForm.value;
    return Object.values(formValues).some(value => value !== '' && value !== null);
  }
  resetForm() {
    this.signupForm.reset();
  }
  id!: Date;
  signup() {
    this.formSubmitted=true;
    console.log('Form Values:', this.signupForm.value);
    console.log('Form Validity:', this.signupForm.valid);

    if (this.signupForm.valid) {
      const date = Date.now();
      const id = new Date(date);
      const password = this.signupForm.value.password;
      const confirmPassword = this.signupForm.value.confirmPassword;

      if (password !== confirmPassword) {
        this.messageService.add({
          severity: 'error',
          summary: 'Password and Confirm Password must match',
          detail: '',
        });
        return; 
      }

      this.loginservice
        .postsignup(
          id,
          this.signupForm.value.firstName,
          this.signupForm.value.lastName,
          this.signupForm.value.emailId,
          this.signupForm.value.phoneNumber,
          this.signupForm.value.password,
          this.signupForm.value.confirmPassword
        )
        .subscribe((data) => {
          if (data.status == 404) {
            this.messageService.add({
              severity: 'error',
              summary: 'Check password and confirm-password',
              detail: '',
            });
          } else {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Message Content',
            });
            this.signupForm.reset();
            this.router.navigate(['login']);
          }
        });
    } else {
      console.error('Form is not valid. Validation errors:', this.signupForm.errors);

      if (this.signupForm.controls['phoneNumber'].hasError('pattern')) {
        this.messageService.add({
          severity: 'error',
          summary: 'Invalid Phone Number',
          detail: '',
        });
      }

      if (this.signupForm.controls['emailId'].hasError('pattern')) {
        this.messageService.add({
          severity: 'error',
          summary: 'Email should be a valid Gmail address',
          detail: '',
        });
      }

        }
  }
  // showDialog() {
  //   this.visible = true;
  // }
  alreadyHasAccount() {
    this.router.navigate(['login']);
  }
}