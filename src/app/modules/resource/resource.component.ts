import { ResourceService } from 'src/app/services/resource.service';
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
// import { Candidates, resourceActions } from 'src/app/store/resource/resource.action';
import { getResource, getResourceError } from 'src/app/store/resource/resource.selector';
import * as XLSX from 'xlsx';
import { Candidates, resourceActions } from 'src/app/store/resource/resource.action';
// import { ResourceService } from 'src/app/services/resource.service';
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
  booleanOptions: string[] = ['Yes', 'No']
  private errorSubscription!: Subscription;
  rolesForm: any;
  isEdit: boolean = false;

    constructor(
    private managerService: ManagernameService,
    private resourceService: ResourceService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private newScheduleService: NewScheduleService,
    private router: Router,
    private store : Store
  ) {
    this.addCandidateForm = this.fb.group({
      candidateId: [null, [Validators.required,Validators.minLength(5)]],
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
      noticePeriod:[''],
      buyout:[''],
      preferredLocation: [''],
      currentCTC: [''],
      expectedCTC:[''],
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
    // this.resourceService.getResourceData();
    console.log("first")
    console.log('normal service coming',  this.resourceService.getResourceData());
    console.log("second")
    this.store.dispatch(resourceActions.getResource());
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
      { label: 'Manage Candidates', routerLink: '/mtalent/resource' },
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
    this.isEdit = true;
  }
  populateFormControls() {
    if (this.selectedRowData) {
      this.addCandidateForm.patchValue({
        candidateId: this.selectedRowData.candidateId || '',
        candidateName: this.selectedRowData.candidateName || '',
        email: this.selectedRowData.emailId || '',
        phone: this.selectedRowData.phoneNumber || '',
        location: this.selectedRowData.currentLocation || '',
        experience: this.selectedRowData.experience || '',
        locationDetails: this.selectedRowData.location || '',
        sourceDetail: this.selectedRowData.source || '',
        spoc: this.selectedRowData.SPOC || '',
        primarySkill: this.selectedRowData.skillSet?.primarySkills || '',
        secondarySkill: this.selectedRowData.skillSet?.secondarySkills || '',
        roles: this.selectedRowData.roles || '',
        validUntil: this.selectedRowData.visaDetails?.validUntil || '',
        visaType: this.selectedRowData.visaDetails?.visaType || '',
        visaStamped: this.selectedRowData.visaDetails?.visaStamped || '',
        noticePeriod: this.selectedRowData.noticePeriod || '',
        buyout: this.selectedRowData.buyout || '',
        preferredLocation: this.selectedRowData.preferredLocation || '',
        currentCTC: this.selectedRowData.currentCTC || '',
        expectedCTC: this.selectedRowData.expectedCTC || '',
      });
    }
    console.log('Edit Data', this.addCandidateForm.value);
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
          validUntil:formData.validUntil?formData.validUntil.toLocaleDateString():null,
          visaType: formData.visaType,
          visaStamped: formData.visaStamped
        }
      }
      console.log('Candidate details are:', candidate);
      this.store.dispatch(resourceActions.addResource({candidate}));
      this.isAddCandidate = false;
      this.addCandidatevisible = false;

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

  // downloadCsvTemplate() {
  //   const csvTemplate = `Candidate Id,Candidate Name,Email Id,Title,Total Experience,Notice Period(In Days),Buyout(Yes/No),Primary Skills,Secondary Skills,Source,SPOC,Phone Number,Onsite/Offshore,Current Location,Preferred Location,Current CTC(In INR),Expected CTC(In INR),Visa Type,Valid Until,Visa Stamped \n`;
  //   const blob = new Blob([csvTemplate], { type: 'text/csv;charset=utf-8' });
  //   saveAs(blob, 'Candidate-template.csv');
  // }

  downloadXlsxTemplate() {
    // Define the headers for the XLSX file
    const headers = [
      "Candidate Id", "Candidate Name", "Email Id", "Title", "Total Experience",
      "Notice Period(In Days)", "Buyout(Yes/No)", "Primary Skills", "Secondary Skills",
      "Source", "SPOC", "Phone Number", "Onsite/Offshore", "Current Location",
      "Preferred Location", "Current CTC(In INR)", "Expected CTC(In INR)",
      "Visa Type", "Valid Until", "Visa Stamped"
    ];

    const worksheet = XLSX.utils.aoa_to_sheet([headers]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Template');
    const workbookBinary = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });
    const blob = new Blob([this.s2ab(workbookBinary)], { type: 'application/octet-stream' });
    saveAs(blob, 'Candidate-template.xlsx');
  }
  s2ab(s: string) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) {
      view[i] = s.charCodeAt(i) & 0xFF;
    }
    return buf;
  }


  updateCandidate() {
    this.formSubmitted = true;
    if (this.addCandidateForm.valid) {
      const formData = this.addCandidateForm.value;
      console.log('Form Data:', formData);
      const candidate : Candidates = {
        candidateId : formData.candidateId,
        candidateName:formData.candidateName,
        emailId : formData.email,
        roles: formData.roles,
        experience : formData.experience,
        noticePeriod: formData.noticePeriod,
        buyout: formData.buyout,
        currentLocation : formData.location,
        preferredLocation: formData.preferredLocation,
        location : formData.locationDetails,
        phoneNumber : formData.phone,
        currentCTC: formData.currentCTC,
        expectedCTC: formData.expectedCTC,
        skillSet : {
          primarySkills :formData.primarySkill,
          secondarySkills: formData.secondarySkill
        },
        source: formData.sourceDetail,
        SPOC: formData.spoc,
        visaDetails: {
          validUntil:formData.validUntil?formData.validUntil.toLocaleDateString():null,
          visaType: formData.visaType,
          visaStamped: formData.visaStamped
        }
      }
      this.store.dispatch(resourceActions.updateResource({candidate}))


      setTimeout(() => {
        this.UpdateMessage();
        this.cancelButton();
       // this.getUniqueCandidatedata();
      }, 1000);
    }
    else{
      console.log("form is not valid")
    }
  }
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
//   uploadCsv(event: any) {
//     const file: File = event.target.files[0];
//     if (file) {
//       const reader: FileReader = new FileReader();
//       reader.onload = () => {
//         const csvData: string = reader.result as string;
//         this.processCsvData(csvData);
//       };
//       reader.readAsText(file);
//     }
//   }
//   processCsvData(csvData: string) {
//     Papa.parse(csvData, {
//       complete: (result: { data: any }) => {
//         const csvRows = result.data.filter((row: { [row: string]: string }) =>
//           Object.keys(row).some((key) => row[key] !== '')
//         );
//         if (csvRows.length === 0) {
//           // this.fileUploadErrorMessage();
//           this.cancelButton();
//           return;
//         }
//         console.log('CSV Data:', csvRows);
// let csvResult : any [] = [];

// for(let data of csvRows){
//   console.log('CSV file data', data);
//   let obj = {
//     "candidateId": data["Candidate Id"],
//       "candidateName" : data["Candidate Name"],
//       "emailId": data["Email Id"],
//       "roles": data["Title"],
//       "experience": data["Total Experience"],
//       "noticePeriod": data["Notice Period(In Days)"],
//       "buyout":data["Buyout(Yes/No)"],
//       "skillSet" : {
//         "primarySkills" : data["Primary Skills"],
//         "secondarySkills": data["Secondary Skills"],
//       },
//       "source": data.Source,
//       "SPOC": data.SPOC,
//      "phoneNumber": data["Phone Number"],
//      "location": data["Onsite/Offshore"],
//      "currentLocation": data["Current Location"],
//      "preferredLocation": data["Preferred Location"],
//      "currentCTC": data["Current CTC(In INR)"],
//      "expectedCTC": data["Expected CTC(In INR)"],
//      "visaDetails": {
//       validUntil: data[ "Valid Until"],
//       visaType:data["Visa Type" ],
//       visaStamped:data[ "Visa Stamped"]
//     }

//   };
//   csvResult.push(obj);
// }
// this.store.dispatch(resourceActions.addMultiResource({candidate: csvResult}));

//         setTimeout(() => {
//           this.fileUploadMessage();
//           this.cancelButton();
//           // this.getUniqueCandidatedata();
//         }, 1000);
//       },
//       header: true,
//     });
//   }

uploadXlsx(event: any) {
  const file: File = event.target.files[0];
  if (file) {
    const reader: FileReader = new FileReader();
    reader.onload = (event) => {
      const binaryData = event.target?.result;
      const workbook = XLSX.read(binaryData, { type: 'binary' });
      workbook.SheetNames.forEach((sheet) => {
        const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
        this.processXlsxData(data);
      });
    };
    reader.readAsBinaryString(file);
  }
}

processXlsxData(data: any) {
  const xlsxRows = data.filter((row: { [key: string]: any }) =>
    Object.keys(row).some((key) => row[key] !== '')
  );
  if (xlsxRows.length === 0) {
    this.cancelButton();
    return;
  }
  console.log('XLSX Data:', xlsxRows);

  let xlsxResult: any[] = [];

  for (let data of xlsxRows) {
    console.log('XLSX file data', data);
    let obj = {
      "candidateId": data["Candidate Id"].toString(),
      "candidateName": data["Candidate Name"],
      "emailId": data["Email Id"],
      "roles": data["Title"],
      "experience": data["Total Experience"],
      "noticePeriod": data["Notice Period(In Days)"],
      "buyout": data["Buyout(Yes/No)"],
      "skillSet": {
        "primarySkills": data["Primary Skills"],
        "secondarySkills": data["Secondary Skills"],
      },
      "source": data["Source"],
      "SPOC": data["SPOC"],
      "phoneNumber": data["Phone Number"],
      "location": data["Onsite/Offshore"],
      "currentLocation": data["Current Location"],
      "preferredLocation": data["Preferred Location"],
      "currentCTC": data["Current CTC(In INR)"],
      "expectedCTC": data["Expected CTC(In INR)"],
      "visaDetails": {
        validUntil: data["Valid Until"],
        visaType: data["Visa Type"],
        visaStamped: data["Visa Stamped"]
      }
    };
    xlsxResult.push(obj);
  }

  this.store.dispatch(resourceActions.addMultiResource({ candidate: xlsxResult }));

  setTimeout(() => {
    this.fileUploadMessage();
    this.cancelButton();
  }, 1000);
}


  selectedDeleteCandidate: any;


  deleteCandidate(){
    console.log('Deleteting Candidate.....', this.selectedDeleteCandidate);
    const candidateId = this.selectedDeleteCandidate.map((candidates : any) => candidates.candidateId)
    console.log('candidate id to be deleted', candidateId)
    this.store.dispatch(resourceActions.deleteResource({candidateId :candidateId }))

   setTimeout(() => {
      this.deleteMessage();
      this.selectedDeleteCandidate = [];
      this.refreshPage();
      // this.getUniqueCandidatedata();
    }, 1500);
  }

  refreshPage(){
    window.location.reload();
  }

  deleteMessage() {
    this.messageService.add({
      severity: 'success',
      summary: 'Deleted',
      detail: 'Candidate Deleted successfully',
    });
  }

  toggleSelection(data: any) {
    if (!data || !data.id) {
      return;
    }
    data.selection = !data.selection;
    if (data.selection) {
      console.log('Selected Candidate:', this.selectedDeleteCandidate);
    } else {
      // this.selectedDeleteCandidate = this.selectedDeleteCandidate.filter(
      //   (selected: any) => selected.candidateId !== data.candidateId
      // );
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
