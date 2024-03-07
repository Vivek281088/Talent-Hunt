import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ManagernameService } from 'src/app/services/managername.service';

@Component({
  selector: 'app-th-dashboard',
  templateUrl: './th-dashboard.component.html',
  styleUrls: ['./th-dashboard.component.scss'],
})
export class THDashboardComponent {
  items: MenuItem[] | undefined;
  home: MenuItem | undefined;
  todayDate!: Date;
  ManagerEmail!: any;
  managerName!: string | null;
  assessmentCount: number = 25;
  assessmentData!: any;

  constructor(private managernameService: ManagernameService) {}
  ngOnInit() {
    sessionStorage.setItem('Component-Name', 'home');
    this.todayDate = new Date();
    this.items = [{ label: 'Dashboard', routerLink: '/thdashboard' }];
    this.home = {
      icon: 'pi pi-home',
      routerLink: '/thdashboard',
      label: 'Home',
    };
    this.assessmentData = [
      {
        name: 'Anand',
        assessment: ' AWS Junior Developer',
        result: 'Scheduled',
      },
      {
        name: 'Aishu',
        assessment: ' AWS Junior Developer',
        result: 'Scheduled',
      },
      {
        name: 'Barani',
        assessment: ' JAVA Junior Developer',
        result: 'Scheduled',
      },
    ];
    this.ManagerEmail = localStorage.getItem('managerEmail');
    this.managernameService
      .getManagerdata_by_Email(this.ManagerEmail)
      .subscribe((response) => {
        console.log('Navbar-res', response);
        this.managerName = response[0].Firstname + ' ' + response[0].Lastname;
      });
  }
  getInitials(name: string | null): string {
    if (!name) {
      return '';
    }
    const names = name.split(' ');
    const initials = names.map((n) => n.charAt(0)).join('');
    return initials.toUpperCase();
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
}
