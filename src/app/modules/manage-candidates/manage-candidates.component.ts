import { Component } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ManagernameService } from 'src/app/services/managername.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as Papa from 'papaparse';
import { saveAs } from 'file-saver';
import { response } from 'express';

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
      candidateName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: [null, [Validators.required]],
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
        candidateName: this.selectedRowData.candidateName,
        email: this.selectedRowData.email,
        phone: this.selectedRowData.phone,
      });
    }
    console.log('Edit Data', this.addCandidateForm);
  }
  onViewClick(data: any) { }
  
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
  addSuccessMessage() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Candidate saved successfully',
    });
    
  }

  saveCandidate() {
    this.formSubmitted = true;

    if (this.addCandidateForm.valid) {
      const formData = this.addCandidateForm.value;
      console.log('Form Data:', formData);

      this.managerService.addCandidate(
        formData.candidateName,
        formData.email,
        formData.phone
      ).subscribe((response) => {
        console.log("Candidate Saved....")
      });
      setTimeout(() => {
        this.addSuccessMessage();
        this.cancelButton();
      },1000);

    }
  }

  downloadCsvTemplate(){
    const csvTemplate = `candidateName,email,phone\n`; 
  const blob = new Blob([csvTemplate], { type: 'text/csv;charset=utf-8' });
  saveAs(blob, 'csv-template.csv');

  }
  
  updateCandidate() {
    console.log('Updating.....');
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
        
        for(let data of csvRows){
          console.log("Csv File datum--", data);

          this.managerService.addCandidate(
            data.candidateName,
            data.email,
            data.phone
          ).subscribe((response) => {
            console.log("Candidate Saved....")
          });

        }
        setTimeout(() => {
          this.fileUploadMessage();
          this.cancelButton();
        }, 1000);
      },
      header: true,
    });
  }
}
