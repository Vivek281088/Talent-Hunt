import { Component, OnDestroy } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ManagernameService } from 'src/app/services/managername.service';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import * as Papa from 'papaparse';
import { saveAs } from 'file-saver';
import { response } from 'express';
import { NewScheduleService } from 'src/app/services/new-schedule.service';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, Subject, Subscription, debounceTime, skip, switchMap, take, takeUntil, tap } from 'rxjs';
import { CalendarModule } from 'primeng/calendar';
import { Candidates, resourceActions } from 'src/app/store/Resource/resource.action';
import { getResource, getResourceError } from 'src/app/store/Resource/resource.selector';
@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.scss'],
  providers: [MessageService],


})
export class ResourceComponent implements OnDestroy{
  private submit$ =new Subject<void>();
  items: MenuItem[] | undefined;
  todayDate!: Date;
  managerData: any;
  candidateData: any;
  managerNames!: string;
  uniqueDepartment: any;
  addCandidatevisible: boolean = false;
  addCandidateForm!: FormGroup;
  formSubmitted: boolean = false;
  isEditCandidate: boolean = false;
  isAddCandidate: boolean = false;
  selectedRowData: any;
  globalSearchValue!: string;
  showUpload: boolean = false;
  uploadedFileData: any;
  error$!: Observable<string>;
  Resource$!: Observable<Candidates[]>;
  candidateId!: string;
  candidateName!: string;
  role: string[] = [];
  skillSet: string[] = [];
  experience!: string ;
  source!: string;
  spoc!: string ;
  location!: string ;
  locations: any = ['Onsite', 'Offshore'];
  sourceOptions: any = ['TFG', 'TAG', 'Referral'];
  visasType:string[] = ['H1B', 'F-1', 'L-1A', 'L-1B'];
  date: Date | undefined;
  visasStamped: string[] = ['Yes', 'No']
  private errorSubscription!: Subscription;
  rolesForm: any;


    constructor(
    private managerService: ManagernameService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private newScheduleService: NewScheduleService,
    private router: Router,
    private store : Store
  ) {
    this.addCandidateForm = this.fb.group({
      candidateId: [null, [Validators.required,Validators.minLength(7)]],
      candidateName: ['', [Validators.required,Validators.minLength(3)]],
      email: ['', [Validators.required,  Validators.email, Validators.pattern('^[a-z0-9._%+-]+@(gmail|mphasis)\\.com$')]],
      phone: [null, [Validators.required,Validators.minLength(10)]],
      location: ['', Validators.required],
      experience: [null, [Validators.required,Validators.minLength(1)]],
      locationDetails:['', Validators.required],
      sourceDetail:['', Validators.required],
      spoc:['', Validators.required],
      primarySkill: ['', Validators.required],
      secondarySkill: ['', Validators.required],
      roles: ['', Validators.required],
      validUntil: [''],
      visaType: [''],
      visaStamped: ['']
    });

    this.error$ = this.store.select(getResourceError);
    this.Resource$ = this.store.select(getResource);
  }
  ngOnDestroy(): void {
    this.submit$.complete()
    this.errorSubscription ? this.errorSubscription.unsubscribe() : null
  }
  ngOnInit() {
    this.store.dispatch(resourceActions.getCandidate());
    this.Resource$.subscribe((candidates) =>
      this.candidateData = candidates)
    console.log("This is Candidate Data", this.candidateData)

    sessionStorage.setItem('Component-Name', 'user');
    this.managerService.getclientManagerData().subscribe((response) => {
    console.log('Client Manager Details', response);
    this.managerData = response;
    this.uniqueDepartment = this.getUniqueDepartments(this.managerData);
      console.log('Unique Department', this.uniqueDepartment);
    });
    this.managerService.getclientManagerName().subscribe((response) => {
      console.log('Client Manager Names-->', response);
      this.managerNames = response;
    });
    this.todayDate = new Date();
    console.log('Date--------', this.todayDate);
    this.items = [
      { label: 'Home', routerLink: '/mtalent/thdashboard', icon: 'pi pi-home' },
      { label: 'Manage Candidates', routerLink: '/mtalent/manage-candidates' },
    ];
  }
  individualResource(id: any) {
    console.log("candidate ids",id)
    sessionStorage.setItem("currentResourceId",id)
    this.router.navigate(['/mtalent/candidatedetails'])
 }
  clear(table: Table) {
    table.clear();
    this.globalSearchValue = '';
  }
  // getUniqueCandidatedata() {
  //   this.newScheduleService
  //     .getUniqueCandidateDetails()
  //     .subscribe((response) => {
  //       this.candidateData = response.filter(
  //         (candidate: any) => candidate !== null
  //       );
  //       console.log('Candidate Data', this.candidateData);
  //     });
  // }

  getUniqueDepartments(data: any[]): any[] {
    const uniqueDepartments = Array.from(
      new Set(data.map((item) => item.department))
    );
    return uniqueDepartments.map((department) => {
      const matchingObject = data.find(
        (item) => item.department === department
      );
      return matchingObject;
    });
  }
  editCandidatevisible: boolean = false;
  handleEditIconClick(data: any) {
    this.isEditCandidate = true;
    this.isAddCandidate = false;
    this.editCandidatevisible = true;
    this.selectedRowData = data;
    console.log(' Selected Edit Data', this.selectedRowData);
    this.populateFormControls();
  }
  populateFormControls() {
    if (this.selectedRowData) {
      this.addCandidateForm.patchValue({
        empid: this.selectedRowData.empid,
        candidateName: this.selectedRowData.candidateName,
        email: this.selectedRowData.candidateEmail,
        phone: this.selectedRowData.candidatePhone,
        location: this.selectedRowData.candidate_location,
        department: this.selectedRowData.department,
      });
    }
    console.log('Edit Data', this.addCandidateForm);
    // this.formSubmitted = true;
  }
  onViewClick(data: any) {}
  addCandidate() {
    this.isAddCandidate = true;
    this.isEditCandidate = false;
    this.addCandidatevisible = true;
  }
  cancelButton() {
    this.addCandidatevisible = false;
    this.editCandidatevisible = false;
    this.addCandidateForm.reset();
    this.addCandidateForm.markAsPristine();
    this.addCandidateForm.markAsUntouched();
    this.formSubmitted = false;
    this.showUpload = false;
  }
  addSuccessMessage() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Candidate saved successfully',
    });
  }
  IdExistError() {
    this.messageService.add({
      severity: 'error',
      summary: 'Candidate Already Present',
      detail: 'Check Employee ID or Email !',
    });
  }

  saveCandidate() {
    this.formSubmitted = true;
    console.log('Form Data:', this.addCandidateForm);
    if (this.addCandidateForm.valid) {
      const formData = this.addCandidateForm.value;
      console.log('Form Data:', formData);
      const candidate : Candidates = {

        candidateId : formData.candidateId,
        candidateName:formData.candidateName,
        currentLocation : formData.location,
        emailId : formData.email,
        experience : formData.experience,
        location : formData.locationDetails,
        phoneNumber : formData.phone,
        skillSet : {
          primarySkills :formData.primarySkill,
          secondarySkills: formData.secondarySkill
        },
        roles: formData.roles,
        source: formData.sourceDetail,
        SPOC: formData.spoc,
        visaDetails: {
          validUntil:formData.validUntil,
          visaType: formData.visaType,
          visaStamped: formData.visaStamped
        }
      }
      console.log('Candidate details are:', candidate);
      this.store.dispatch(resourceActions.addCandidate({candidate}));
      // this.isAddCandidate = false;
      this.addCandidatevisible = true;

    }
  }
  // multiClickPreventSetUp(){
  //   this.submit$.pipe(
  //     debounceTime(800),
  //     tap((candidate) => console.log("asfhbahvbva",candidate)),
  //     switchMap(() => {
  //       this.saveCandidate();
  //       return this.store.pipe(select(checkCandidateAddStaus), skip(1),takeUntil(this.submit$));
  //     })
  //   ).subscribe(status => {
  //     if (status) {
  //       console.log("astatu s s " , status)
  //       this.addSuccessMessage();
  //       this.cancelButton();
  //       this.store.dispatch(candidateActions.clearNewcandidate());
  //     }
  //   });
  //   this.submit$.pipe(
  //     debounceTime(800),
  //     tap((candidate) => console.log("asfhbahvbva",candidate)),
  //     switchMap(() => {
  //       return this.store.pipe(select(getCandidateError), skip(1),takeUntil(this.submit$));
  //     })
  //   ).subscribe(error => {
  //     if (error) {
  //       console.log('Mail already exists', error);
  //       this.messageService.add({
  //         severity: 'error',
  //         summary: error,
  //         detail: 'Check Employee ID or Email!',
  //       });
  //       this.cancelButton();
  //       this.store.dispatch(candidateActions.clearCandidateError());
  //     }
  //   });
  // }

  downloadCsvTemplate() {
    const csvTemplate = `Candidate Id, Candidate Name, Email Id, Role(s), Experience, Primary Skills, Secondary Skills, Source, SPOC, Phone Number, Onsite/Offshore, Current Location, Visa Type, Valid Until, Visa Stamped \n`;
    const blob = new Blob([csvTemplate], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'Candidate-template.csv');
  }
  // updateCandidate() {
  //   this.formSubmitted = true;
  //   if (this.addCandidateForm.valid) {
  //     const formData = this.addCandidateForm.value;
  //     console.log('Form Data:', formData);
  //     const candidate : Candidate= {
  //       id: "",
  //       candidateName: formData.candidateName,
  //       candidateEmail: formData.email,
  //       candidatePhone: formData.phone,
  //       empid: formData.empid,
  //       department: formData?.department,
  //       candidate_location: formData?.location,
  //     }
  //     this.store.dispatch(candidateActions.updateCandidate({candidate}))
  //     // this.managerService
  //     //   .updateCandidate(
  //     //     formData.candidateName,
  //     //     formData.email,
  //     //     formData.phone,
  //     //     formData.empid,
  //     //     formData?.department,
  //     //     formData?.location
  //     //   )
  //     //   .subscribe((response) => {
  //     //     console.log('Candidate Updated....');
  //     //   });

  //     setTimeout(() => {
  //       this.UpdateMessage();
  //       this.cancelButton();
  //      // this.getUniqueCandidatedata();
  //     }, 1000);
  //   }
  // }
  UpdateMessage() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Candidate updated successfully',
    });
  }
  fileUploadMessage() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Candidate uploaded successfully',
    });
  }
  fileUploadErrorMessage() {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'File is Empty',
    });
  }
  uploadCsv(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader: FileReader = new FileReader();
      reader.onload = () => {
        const csvData: string = reader.result as string;
        this.processCsvData(csvData);
      };
      reader.readAsText(file);
    }
  }
  processCsvData(csvData: string) {
    Papa.parse(csvData, {
      complete: (result: { data: any }) => {
        const csvRows = result.data.filter((row: { [row: string]: string }) =>
          Object.keys(row).some((key) => row[key] !== '')
        );
        if (csvRows.length === 0) {
          this.fileUploadErrorMessage();
          this.cancelButton();
          return;
        }
        console.log('CSV Data:', csvRows);
        for (let data of csvRows) {
          console.log('Csv File datum--', data);
          this.managerService
            .addCandidate(
              data.candidateName,
              data.email,
              data.phone,
              data.empid,
              data?.Department,
              data?.Location
            )
            .subscribe((response) => {
              console.log('Candidate Saved....');
            });
        }
        setTimeout(() => {
          this.fileUploadMessage();
          this.cancelButton();
          // this.getUniqueCandidatedata();
        }, 1000);
      },
      header: true,
    });
  }
  gotoCandidateProfile(data: any) {
    console.log('Candidate data', data);
    // this.newScheduleService.setCandidateProfileData(data);
    sessionStorage.setItem('CandiateProfileId', data.empid);
    sessionStorage.setItem('CandiateProfileName', data.candidateName);
    sessionStorage.setItem('CandiateProfileEmail', data.candidateEmail);
    sessionStorage.setItem('CandiateProfilePhone', data.candidatePhone);
    sessionStorage.setItem('CandiateProfileDepartment', data.department);
    sessionStorage.setItem('CandiateProfileLocation', data.candidate_location);
    this.router.navigate(['/mtalent/candidateProfile']);
  }
  selectedDeleteCandidate: any;
  // deleteCandidate() {
  //   console.log('Deleteting Candidate.....', this.selectedDeleteCandidate);
  //   const candidates = this.selectedDeleteCandidate.map((candidate: { id: string , candidateEmail :string }) => ({id : candidate.id , candidateEmail : candidate.candidateEmail}))
  //   console.log("candidates to be deleted" , candidates)
  //   this.store.dispatch(resourceActions.deleteCandidates({candidates}))
  //   setTimeout(() => {
  //     this.deleteMessage();
  //     this.selectedDeleteCandidate = [];
  //     // this.getUniqueCandidatedata();
  //   }, 1500);
  // }
  deleteMessage() {
    this.messageService.add({
      severity: 'success',
      summary: 'Deleted',
      detail: 'Candidate Deleted successfully',
    });
  }
  toggleSelection(data: any) {
    if (!data || !data.empid) {
      return;
    }
    data.selection = !data.selection;
    if (data.selection) {
      console.log('Selected Candidate:', this.selectedDeleteCandidate);
    } else {
      this.selectedDeleteCandidate = this.selectedDeleteCandidate.filter(
        (selected: any) => selected.empid !== data.empid
      );
      console.log('Selected ----Candidate :', this.selectedDeleteCandidate);
    }
  }
  selectAll() {
    console.log('Selected all Candidate:', this.selectedDeleteCandidate);
  }

  createRole(): FormGroup {
    return this.fb.group({
      role: ['', Validators.required]
    });
  }

  get roles(): FormArray {
    return this.addCandidateForm.get('roles') as FormArray;
  }

  addRole(): void {
    this.roles.push(this.createRole());
  }

  removeRole(index: number): void {
    this.roles.removeAt(index);
  }



createVisa(): FormGroup {
  return this.fb.group({
    validUntil: ['', Validators.required],
    visaType: ['', Validators.required],
    visaStamped: ['', Validators.required]
  });
}

get visas(): FormArray {
  return this.addCandidateForm.get('visas') as FormArray;
}

addVisa(): void {
  this.visas.push(this.createVisa());
}

removeVisa(index: number): void {
  this.visas.removeAt(index);
}

}
