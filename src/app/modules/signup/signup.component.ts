import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Guard/auth.service';
import { MessageService } from 'primeng/api';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { PasswordValidator } from './password-validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [MessageService],
})
export class SignupComponent {
  signupForm: FormGroup;
  formSubmitted: boolean = false;
  isPasswordInvalid: boolean = false;
  isPhonenoInvalid: boolean = false;
  isMailIdInvalid: boolean = false;
  passwordNotMatching: boolean = true;
  private subscription: Subscription = new Subscription();

  constructor(
    private loginservice: LoginService,
    private messageService: MessageService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.signupForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        phoneNumber: [
          '',
          [Validators.required, Validators.pattern('^[0-9]{10}$')],
        ],
        emailId: [
          '',
          [
            Validators.required,
            Validators.email,
            Validators.pattern('^[a-z0-9._%+-]+@(gmail|mphasis)\\.com$'),
          ],
        ],

        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
            ),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
      },
      { validator: PasswordValidator.match }
    );

    this.subscription.add(
      this.signupForm
        .get('password')!
        .valueChanges.pipe(debounceTime(2000))
        .subscribe(() => {
          this.isPasswordInvalid = this.signupForm.get('password')!.invalid;
        })
    );

    this.subscription.add(
      this.signupForm
        .get('phoneNumber')!
        .valueChanges.pipe(debounceTime(2000))
        .subscribe(() => {
          this.isPhonenoInvalid = this.signupForm.get('phoneNumber')!.invalid;
        })
    );

    this.subscription.add(
      this.signupForm
        .get('emailId')!
        .valueChanges.pipe(debounceTime(2000))
        .subscribe(() => {
          this.isMailIdInvalid = this.signupForm.get('emailId')!.invalid;
        })
    );

    this.subscription.add(
      this.signupForm
        .get('confirmPassword')!
        .valueChanges.pipe(debounceTime(2000))
        .subscribe(() => {
          console.log(
            this.signupForm.get('password')?.value,
            this.signupForm.get('confirmPassword')?.value
          );
          console.log('Fomrs ', this.signupForm);
          if (
            this.signupForm.get('password')?.value !==
            this.signupForm.get('confirmPassword')?.value
          ) {
            this.passwordNotMatching = true;
            console.log('from confirm password', this.passwordNotMatching);
          } else {
            this.passwordNotMatching = false;
          }
        })
    );
  }

  ngOnInit() {}

  id!: Date;
  signup() {
    this.formSubmitted = true;
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

      this.successValidForm();
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
          console.log('Sign Up successfully', data);
        });

      setTimeout(() => {
        this.signupForm.reset();
        this.router.navigate(['login']);
      }, 1500);
    } else {
      console.error(
        'Form is not valid. Validation errors:',
        this.signupForm.errors
      );
    }
  }
  alreadyHasAccount() {
    this.router.navigate(['login']);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  successValidForm() {
    this.messageService.add({
      severity: 'success',

      summary: 'Success',

      detail: 'Account created Successfully',
    });
  }
  onEnterKey() {
    if (this.signupForm.valid) {
      this.signup();
    }
  }
}
