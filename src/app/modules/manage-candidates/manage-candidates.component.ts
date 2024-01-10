import { Component } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ManagernameService } from 'src/app/services/managername.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileUpload } from 'primeng/fileupload';
import {
  HttpEvent,
  HttpErrorResponse,
  HttpEventType,
} from '@angular/common/http';
import * as Papa from 'papaparse';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-manage-candidates',
  templateUrl: './manage-candidates.component.html',
  styleUrls: ['./manage-candidates.component.scss'],
  providers: [MessageService],
})
export class ManageCandidatesComponent {
  items: MenuItem[] | undefined;
  todayDate!: string;
  managerData: any;
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

  constructor(
    private managerService: ManagernameService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
    this.addCandidateForm = this.fb.group({
      employeeId: [null, [Validators.required]],
      candidateName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      department: ['', [Validators.required]],
      location: ['', [Validators.required]],
    });
  }
  ngOnInit() {
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
    this.todayDate = this.formattedDate(new Date());
    console.log('Date--------', this.todayDate);

    this.items = [
      { label: 'Home', routerLink: '/login', icon: 'pi pi-home' },
      { label: 'Candidates', routerLink: '/manage-candidates' },
    ];
  }
  formattedDate(date: Date) {
    const months: string[] = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    const month: string = months[date.getMonth()];
    const day: number = date.getDate();
    const year: number = date.getFullYear();
    const formatDate: string = `${month} ${day}, ${year}`;

    return formatDate;
  }
  clear(table: Table) {
    table.clear();
    this.globalSearchValue = '';
  }

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
  handleEditIconClick(data: any) {
    this.isEditCandidate = true;
    this.isAddCandidate = false;
    this.addCandidatevisible = true;

    this.selectedRowData = data;
    console.log(' Selected Edit Data', this.selectedRowData);

    this.populateFormControls();
  }
  populateFormControls() {
    if (this.selectedRowData) {
      this.addCandidateForm.patchValue({
        employeeId: this.selectedRowData.empid,
        candidateName: this.selectedRowData.managerName,
        email: this.selectedRowData.email,
        department: this.selectedRowData.department,
        location: this.selectedRowData.location,
      });
    }
    console.log('Edit Data', this.addCandidateForm);
  }
  onViewClick(data: any) {}
  addCandidate() {
    this.isAddCandidate = true;
    this.isEditCandidate = false;
    this.addCandidatevisible = true;
  }
  deleteCandidate() {}
  cancelButton() {
    this.addCandidatevisible = false;
    this.addCandidateForm.reset();
    this.addCandidateForm.markAsPristine();
    this.addCandidateForm.markAsUntouched();
    this.formSubmitted = false;
    this.showUpload = false;
  }

  saveCandidate() {
    this.formSubmitted = true;

    if (this.addCandidateForm.valid) {
      const formData = this.addCandidateForm.value;
      console.log('Form Data:', formData);
      this.addCandidatevisible = false;

      this.addCandidateForm.reset();
      this.formSubmitted = false;
    }
  }
  updateCandidate() {
    console.log('Updating.....');
  }

  showFileUpload() {
    this.showUpload = !this.showUpload;
    console.log('hi', this.showUpload);
  }
  fileUploadMessage() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Candidate stored successfully',
    });
  }
  fileUploadErrorMessage() {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'File is Empty',
    });
  }
  
  // onFileRemove() {
  //   this.messageService.add({
  //     severity: 'warn',
  //     summary: 'File Removed',
  //     detail: '',
  //   });
  // }

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
    complete: (result: { data: any; }) => {
      const csvRows = result.data.filter((row: { [row: string]: string; }) => Object.keys(row).some(key => row[key] !== ''));

      if (csvRows.length === 0) {
        this.fileUploadErrorMessage();
        this.cancelButton();
        return;
      }
      console.log('CSV Data:', csvRows);
      setTimeout(()=>{
        this.fileUploadMessage();
        this.cancelButton();
      },1000);
    },
    header: true, 
  });
}
  // onFileUpload(event: any) {
  //   const fileUpload: FileUpload = event.files[0];
  //   console.log("Uploaded Data",this.uploadedFileData)
  //   if (event.originalEvent.type === HttpEventType.Response) {
  //     this.uploadedFileData = event.originalEvent.body; 
  //     this.messageService.add({
  //       severity: 'info',
  //       summary: 'File Uploaded',
  //       detail: '',
  //     });

  //     // Process the uploaded file data as needed
  //     console.log('Uploaded File Data:', this.uploadedFileData);
  //   }

  //   // Handle any errors during file upload
  //   if (event.originalEvent.type === HttpEventType.Response) {
  //     const errorResponse: HttpErrorResponse = event.originalEvent;
  //     this.messageService.add({
  //       severity: 'error',
  //       summary: 'Error Uploading File',
  //       detail: errorResponse.message || 'Unknown error',
  //     });
  //   }
  // }
}
