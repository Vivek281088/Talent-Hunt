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
import { PasswordValidator } from '../signup/password-validator';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss'],
  providers: [MessageService],
})
export class ResetpasswordComponent {
  resetForm!: FormGroup;
  formSubmitted: boolean = false;
  isPasswordInvalid: boolean = false;
  isPhonenoInvalid: boolean = false;
  isMailIdInvalid: boolean = false;
  passwordNotMatching: boolean = true;
  private subscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private loginservice: LoginService,
    private messageService: MessageService
  ) {
    this.resetForm = this.fb.group(
      {
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
      this.resetForm
        .get('password')!
        .valueChanges.pipe(debounceTime(2000))
        .subscribe(() => {
          this.isPasswordInvalid = this.resetForm.get('password')!.invalid;
        })
    );

    this.subscription.add(
      this.resetForm
        .get('emailId')!
        .valueChanges.pipe(debounceTime(2000))
        .subscribe(() => {
          this.isMailIdInvalid = this.resetForm.get('emailId')!.invalid;
        })
    );

    this.subscription.add(
      this.resetForm
        .get('confirmPassword')!
        .valueChanges.pipe(debounceTime(2000))
        .subscribe(() => {
          console.log(
            this.resetForm.get('password')?.value,
            this.resetForm.get('confirmPassword')?.value
          );
          console.log('Fomrs ', this.resetForm);
          if (
            this.resetForm.get('password')?.value !==
            this.resetForm.get('confirmPassword')?.value
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
 
