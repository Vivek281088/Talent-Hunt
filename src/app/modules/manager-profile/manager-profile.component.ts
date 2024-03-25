import { Component } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TableService } from 'src/app/services/table.service';
import { Table } from 'primeng/table';
import { ManagernameService } from 'src/app/services/managername.service';
import { NewScheduleService } from 'src/app/services/new-schedule.service';
import { forkJoin } from 'rxjs';
import { PasswordValidator } from '../signup/password-validator';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';



@Component({
  selector: 'app-manager-profile',
  templateUrl: './manager-profile.component.html',
  styleUrls: ['./manager-profile.component.scss'],
  providers: [MessageService],
})
export class ManagerProfileComponent {
  items: MenuItem[] | undefined;
  editManagerForm!: FormGroup;
  formSubmitted: boolean = false;
  
  
  visible: boolean = false;
  resetPasswordForm!: FormGroup;
  isPasswordInvalid: boolean = false;

  //schedules
  globalSearchValue!: string;
  viewQuestionSidebar: boolean = false;
  passwordNotMatching: boolean = true;
  FinalizedQuestions!: any;
  scheduleData: any;
  scheduleLength:number=0
  assesmentLength:number=0

  //assessment
  candidateList: any[] = [];
  private subscription: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private tableService: TableService,
    private managernameService: ManagernameService,
    private router: Router,
    private newScheduleService: NewScheduleService
  ) {
    this.editManagerForm = this.fb.group({
      employeeId: [{ value: '', disabled: true }, [Validators.required]],
      managerName: [{ value: '', disabled: true }, [Validators.required]],
      email: [{ value: null, disabled: true }, [Validators.required, Validators.email]],
      phone: [{ value: null, disabled: true }, [Validators.required]],
      department: [{ value: '', disabled: true }, [Validators.required]],
      location: [{ value: '', disabled: true }, [Validators.required]],
    });
    this.resetPasswordForm = this.fb.group({
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
      this.resetPasswordForm
        .get('password')!
        .valueChanges.pipe(debounceTime(2000))
        .subscribe(() => {
          this.isPasswordInvalid = this.resetPasswordForm.get('password')!.invalid;
        })
    );
    this.subscription.add(
      this.resetPasswordForm
        .get('confirmPassword')!
        .valueChanges.pipe(debounceTime(2000))
        .subscribe(() => {
          console.log(
            this.resetPasswordForm.get('password')?.value,
            this.resetPasswordForm.get('confirmPassword')?.value
          );
          console.log('Fomrs ', this.resetPasswordForm);
          if (
            this.resetPasswordForm.get('password')?.value !==
            this.resetPasswordForm.get('confirmPassword')?.value
          ) {
            this.passwordNotMatching = true;
            console.log('from confirm password', this.passwordNotMatching);
          } else {
            this.passwordNotMatching = false;
          }
        })
    );
  }


  ngOnInit() {
    this.getManagerData();

    this.items = [
      { label: 'Home', routerLink: '/login', icon: 'pi pi-home' },
      { label: 'Manager', routerLink: '/manage-managers' },
      { label: 'Manager Profile', routerLink: '/managerProfile' },
    ];
  }
  getManagerData() {

    this.editManagerForm.setValue({
      employeeId: sessionStorage.getItem('ManagerProfileId')?.toString(),
      managerName: sessionStorage.getItem('ManagerProfileName'),
      email: sessionStorage.getItem('ManagerProfileEmail'),
      phone: sessionStorage.getItem('ManagerProfilePhone'),
      department: sessionStorage.getItem('ManagerProfiledepartment'),
      location: sessionStorage.getItem('ManagerProfileLocation'),
    });
    console.log('Form Values', this.editManagerForm.value);
    console.log('Manager Name', this.editManagerForm.value.managerName);

    this.managernameService
      .postManagerName(this.editManagerForm.value.managerName)
      .subscribe((response) => {
        console.log('ManagerData---->', response);
        this.scheduleData = response.result1;
        this.scheduleLength=this.scheduleData.length
        this.candidateList = response.result2;
        this.assesmentLength=this.candidateList.length
        console.log('ManagerScheduleData---->', this.scheduleData);
        console.log('Manager Assessment Data---->', this.candidateList);
      });
  }

  cancelButton() {
    this.editManagerForm.reset();
    this.editManagerForm.markAsPristine();
    this.editManagerForm.markAsUntouched();
    this.formSubmitted = false;
  }

  closeManagerProfile() {
    this.router.navigate(['/manage-managers']);
  }

  resetPassword() {
    this.visible = true;
    this.formSubmitted = false;

  }

  //schedules

  onSearchClick(dt2: Table) {
    this.globalSearchValue = '';
    dt2.clear();
  }

  getFormattedSkills(skills: any): {
    skills: string[];
    remainingCount: number;
  } {
    const maxLength = 16;

    let result: string[] = [];
    let totalLength = 0;

    for (const skill of skills) {
      if (totalLength + skill.length <= maxLength) {
        result.push(skill);
        totalLength += skill.length;
      } else {
        break;
      }
    }
    const remainingCount = skills.length - result.length;

    return { skills: result, remainingCount: remainingCount };
  }
  remainaingSkills(skills: any, count: number): string[] {
    return skills.slice(-count);
  }

  onViewClick(questions: any) {
    this.viewQuestionSidebar = true;
    this.getQuestionsById(questions);
    console.log('View questions :', this.FinalizedQuestions);
  }
  getQuestionsById(questionIdArray: any) {
    console.log('get id', questionIdArray);
    const observables = questionIdArray.map((questionId: string) =>
      this.newScheduleService.getIndividualQuestion(questionId)
    );
    forkJoin(observables).subscribe((responses: any) => {
      this.FinalizedQuestions = responses;
      console.log('Updated Total Question data--', this.FinalizedQuestions);
    });
  }

  getSelectedOptions(selected_Option: any, option: any) {
    if (option.includes(selected_Option)) {
      return 'correctAnswer';
    } else {
      return 'wrongAnswer';
    }
  }
  getLabel(index: number) {
    return String.fromCharCode(65 + index);
  }

  clear(table: Table) {
    table.clear();
  }
  getResultClass(result: string): string {
    if (result == 'Shortlisted') {
      return 'Shortlisted';
    } else if (result == 'Rejected') {
      return 'Rejected';
    } else if (result == 'Awaiting Eval') {
      return 'Awaiting ';
    } else if (result == 'Cancelled') {
      return 'Cancelled';
    } else {
      return 'Scheduled';
    }
  }
  closePreview() {
    this.viewQuestionSidebar = false;
  }

  resetFunction() {
    this.visible = false;
    this.formSubmitted = false;
    this.resetPasswordForm.markAsPristine();
    this.resetPasswordForm.markAsUntouched();
    this.resetPasswordForm.reset();
    this.router.navigate(['/managerProfile']);
  }

  updatereset() {
    const password = this.resetPasswordForm.get('password')?.value;
    const email = this.editManagerForm.get('email')?.value
    console.log("Data" , password , email)
    this.managernameService
    .postResetPassword(
      password,
      email

    )
    .subscribe((response) => {
      console.log('Manager Updated....');
    });
this.visible=false;

  }


}