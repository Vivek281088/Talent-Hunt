import { Component } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ManagernameService } from 'src/app/services/managername.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as Papa from 'papaparse';
import { saveAs } from 'file-saver';
import { Router } from '@angular/router';
import { NewScheduleService } from 'src/app/services/new-schedule.service';
@Component({
  selector: 'app-manage-managers',
  templateUrl: './manage-managers.component.html',
  styleUrls: ['./manage-managers.component.scss'],
  providers: [MessageService],
})
export class ManageManagersComponent {
  items: MenuItem[] | undefined;
  todayDate!: string;
  managerData: any;
  managerNames!: string;
  elipsisOverlayVisible: boolean = false;
  uniqueDepartment: any;
  globalSearchValue!: string;
  visible: boolean = false;
  isAddManager: boolean = false;
  isEditManager: boolean = false;
  addManagerForm!: FormGroup;
  formSubmitted: boolean = false;

  constructor(
    private managerService: ManagernameService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private router: Router,
    private newScheduleService: NewScheduleService
  ) {
    this.addManagerForm = this.fb.group({
      employeeId: [null, [Validators.required,Validators.maxLength(7),Validators.minLength(7)]],
      managerName: ['', [Validators.required,Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [null, [Validators.required,Validators.maxLength(10)]],
      department: ['', [Validators.required,Validators.maxLength(10)]],
      location: ['', [Validators.required,Validators.maxLength(10)]],
    });
  }
  ngOnInit() {
    sessionStorage.setItem('Component-Name', 'user');
    this.loadManagerData();

    this.todayDate = this.formattedDate(new Date());
    console.log('Date--------', this.todayDate);

    this.items = [
      { label: 'Home', routerLink: '/login', icon: 'pi pi-home' },
      { label: 'Managers', routerLink: '/manage-managers' },
    ];
  }
  loadManagerData() {
    this.managerService.getclientManagerData().subscribe((response) => {
      console.log('Client Manager Details', response);
      this.managerData = response;

      this.managerData.forEach((manager: { selection: boolean }) => {
        manager.selection = manager.selection || false; 
      });
    });
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

 

  addManager() {
    this.visible = true;
    this.isAddManager = true;
    this.isEditManager = false;
  }
  selectedRowData: any;
  EditManagerDialog: boolean = false;
  handleEditIconClick(data: any) {
    this.isEditManager = true;
    this.isAddManager = false;
    this.EditManagerDialog = true;

    this.selectedRowData = data;
    console.log(' Selected Edit Data', this.selectedRowData);

    this.populateFormControls();
  }
  populateFormControls() {
    if (this.selectedRowData) {
      this.addManagerForm.patchValue({
        employeeId: this.selectedRowData.empid,
        managerName: this.selectedRowData.managerName,
        email: this.selectedRowData.email,
        phone: this.selectedRowData.phoneNo,
        department: this.selectedRowData.department,
        location: this.selectedRowData.managerLocation,
      });
    }
    console.log('Edit Data', this.addManagerForm);
  }

  cancelButton() {
    this.visible = false;
    this.EditManagerDialog = false;
    this.addManagerForm.reset();
    this.addManagerForm.markAsPristine();
    this.addManagerForm.markAsUntouched();
    this.formSubmitted = false;
  }
  saveSuccessMessage() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Manager saved successfully',
    });
  }
  updateSuccessMessage() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Manager updated successfully',
    });
  }
  gotoManagerProfile(data: any) {
    console.log('Selected Manager Data', data);
    // this.newScheduleService.setManagerProfileData(data);
    sessionStorage.setItem("ManagerProfileId", data.empid);
    sessionStorage.setItem('ManagerProfileName', data.managerName);
    sessionStorage.setItem('ManagerProfileEmail', data.email);
    sessionStorage.setItem('ManagerProfilePhone', data.phoneNo);
    sessionStorage.setItem('ManagerProfileLocation', data.managerLocation);
    sessionStorage.setItem('ManagerProfiledepartment', data.department);


    this.router.navigate(['/managerProfile']);
  }

  createButton() {
    this.formSubmitted = true;

    if (this.addManagerForm.valid) {
      const formData = this.addManagerForm.value;
      console.log('Form Data:', formData);

      this.managerService
        .postClientManager(
          formData.employeeId,
          formData.managerName,
          formData.email,
          formData.phone,
          formData.department,
          formData.location
        )
        .subscribe((response) => {
          console.log('Manager Posted....');
        });
      setTimeout(() => {
        this.saveSuccessMessage();
        this.cancelButton();
        this.loadManagerData();
      }, 1000);
    }
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

  downloadCsvTemplate() {
    const csvTemplate = `employeeId,managerName,email,phone,department,location\n`;
    const blob = new Blob([csvTemplate], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'manager-template.csv');
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
            .postClientManager(
              (data.employeeId = parseInt(data.employeeId, 10)),
              data.managerName,
              data.email,
              data.phone,
              data.department,
              data.location
            )
            .subscribe((response) => {
              console.log('Manager Saved....');
            });
        }

        setTimeout(() => {
          this.fileUploadMessage();
          this.cancelButton();
          this.loadManagerData();
        }, 1000);
      },
      header: true,
    });
  }
  fileUploadMessage() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Manager saved successfully',
    });
  }

  deleteMessage() {
    this.messageService.add({
      severity: 'success',
      summary: 'Deleted',
      detail: 'Manager Deleted successfully',
    });
  }
  fileUploadErrorMessage() {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'File is Empty',
    });
  }

  updateManager(data: any) {
    console.log('Updating.......', data);
    this.managerService
      .updateManagerDetails(
        data.managerName,
        data.email,
        data.phone,
        data.employeeId,
        data.department,
        data.location
      )
      .subscribe((response) => {
        console.log('Manager Updated....');
      });

    setTimeout(() => {
      this.updateSuccessMessage();
      this.cancelButton();
      this.loadManagerData();
    }, 1000);
  }

  selectedDeleteManager: any;
  deleteManager() {
    console.log('Deleteting Manager.....', this.selectedDeleteManager);
    for (let managerData of this.selectedDeleteManager) {
      this.managerService
        .deleteManagerDetails(managerData.empid, managerData.email)
        .subscribe((response) => {
          console.log('Deleted Manager.....', managerData.managerName);
        });
    }

    setTimeout(() => {
      this.deleteMessage();
      this.selectedDeleteManager = [];
      this.loadManagerData();
    }, 1500);
  }

  toggleSelection(data: any) {
    if (!data || !data.empid) {
      return;
    }
    data.selection = !data.selection;

    if (data.selection) {
      console.log('Selected Manager:', this.selectedDeleteManager);
    } else {
      this.selectedDeleteManager = this.selectedDeleteManager.filter(
        (selected: any) => selected.empid !== data.empid
      );
      console.log('Selected ----Manager :', this.selectedDeleteManager);
    }
  }
  selectAll() {
    console.log('Selected all Manager:', this.selectedDeleteManager);
  }
}
