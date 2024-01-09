import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { ManagernameService } from 'src/app/services/managername.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-manage-candidates',
  templateUrl: './manage-candidates.component.html',
  styleUrls: ['./manage-candidates.component.scss'],
})
export class ManageCandidatesComponent {
  items: MenuItem[] | undefined;
  todayDate!: string;

  managerNames!: string;
  uniqueDepartment: any;
  addCandidatevisible: boolean = false;
  addCandidateForm!: FormGroup;
  formSubmitted: boolean = false;

  constructor(
    private managerService: ManagernameService,
    private fb: FormBuilder
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
    // this.managerService.getclientManagerData().subscribe((response) => {
    //   console.log('Client Manager Details', response);
    //   this.managerData = response;

    //   this.uniqueDepartment =this.getUniqueDepartments(this.managerData);
    //   console.log('Unique Department', this.uniqueDepartment);

    // });

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
  handleEditIconClick(data: any) {}
  onViewClick(data: any) {}
  addCandidate() {
    this.addCandidatevisible = true;
  }
  cancelButton() {
    this.addCandidatevisible = false;
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
}
