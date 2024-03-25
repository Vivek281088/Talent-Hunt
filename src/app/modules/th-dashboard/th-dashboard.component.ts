import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { DataService } from 'src/app/services/data.service';
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
  assessmentCount!: number;
  assessmentData!: any;
  recentData!: any;
  scheduleData!: any;
  recentAssessmentDataContext: any;
  dashboardCount: any;
  constructor(
    private managernameService: ManagernameService,
    private dataService: DataService
  ) {}
  ngOnInit() {
    sessionStorage.setItem('Component-Name', 'home');
    this.getDashboardCount();
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
        result: 'Shortlisted',
      },
      {
        name: 'Aishu',
        assessment: ' AWS Junior Developer',
        result: 'Scheduled',
      },
      {
        name: 'Barani',
        assessment: ' JAVA Junior Developer',
        result: 'Rejected',
      },
      {
        name: 'Kannan',
        assessment: ' JAVA Junior Developer',
        result: 'Scheduled',
      },
      {
        name: 'Barani',
        assessment: ' JAVA Junior Developer',
        result: 'Shortlisted',
      },
      {
        name: 'Barani',
        assessment: ' JAVA Junior Developer',
        result: 'Rejected',
      },
    ];
    this.dataService.getDashboardData().subscribe((response) => {
      // this.recentAssessmentDataContext = response;
      console.log('Dashboard Data', response);
      this.recentData = [
        {
          title: 'New Schedule Created',
          content: response[0].context[0],
          time: response[0].Time,
        },
        {
          title: 'Assessment Completed',
          content: response[1].context[0],
          time: response[1].Time,
        },
        {
          title: 'Assessment invites sent to Candidates',
          content: 'Invite for Junior AWS Dev has been sent to',
          time: '25 min',
        },
        {
          title: 'Changed User Password',
          content: 'Mathanrajprabhu created new schedule Junior AWS Dev',
          time: '25 min',
        },
      ];
    });

    this.scheduleData = [
      {
        assessment: ' AWS Junior Developer',
        managerName: 'Chandrasekar',
        scheduled: 5,
        shortlisted: 2,
        rejected: 1,
      },
      {
        assessment: 'Junior Frontend Developer',
        managerName: 'Chandrasekar',
        scheduled: 15,
        shortlisted: 8,
        rejected: 3,
      },
      {
        assessment: ' Github Junior Developer',
        managerName: 'Madhanrajprabhu',
        scheduled: 10,
        shortlisted: 4,
        rejected: 1,
      },
      {
        assessment: ' Node.Js Expert',
        managerName: 'Deborah Wheeler',
        scheduled: 5,
        shortlisted: 2,
        rejected: 1,
      },
      {
        assessment: 'Senior Software Engineer',
        managerName: 'Krishnakumar K',
        scheduled: 8,
        shortlisted: 2,
        rejected: 1,
      },
      {
        assessment: ' Senior Testing Engineer',
        managerName: 'Krishnakumar K',
        scheduled: 9,
        shortlisted: 5,
        rejected: 2,
      },
      {
        assessment: ' Full Stack Developer',
        managerName: 'Indu Nair',
        scheduled: 5,
        shortlisted: 2,
        rejected: 1,
      },
      {
        assessment: 'Senior AWS Developer',
        managerName: 'Chandrasekar',
        scheduled: 5,
        shortlisted: 2,
        rejected: 1,
      },
      {
        assessment: ' AWS Junior Developer',
        managerName: 'Chandrasekar',
        scheduled: 5,
        shortlisted: 2,
        rejected: 1,
      },
      {
        assessment: 'Junior Frontend Developer',
        managerName: 'Chandrasekar',
        scheduled: 15,
        shortlisted: 8,
        rejected: 3,
      },
      {
        assessment: ' Github Junior Developer',
        managerName: 'Madhanrajprabhu',
        scheduled: 10,
        shortlisted: 4,
        rejected: 1,
      },
      {
        assessment: ' Node.Js Expert',
        managerName: 'Deborah Wheeler',
        scheduled: 5,
        shortlisted: 2,
        rejected: 1,
      },
      {
        assessment: 'Senior Software Engineer',
        managerName: 'Krishnakumar K',
        scheduled: 8,
        shortlisted: 2,
        rejected: 1,
      },
      {
        assessment: ' Senior Testing Engineer',
        managerName: 'Krishnakumar K',
        scheduled: 9,
        shortlisted: 5,
        rejected: 2,
      },
      {
        assessment: ' Node.Js Expert',
        managerName: 'Deborah Wheeler',
        scheduled: 5,
        shortlisted: 2,
        rejected: 1,
      },
      {
        assessment: 'Senior Software Engineer',
        managerName: 'Krishnakumar K',
        scheduled: 8,
        shortlisted: 2,
        rejected: 1,
      },
      {
        assessment: ' Senior Testing Engineer',
        managerName: 'Krishnakumar K',
        scheduled: 9,
        shortlisted: 5,
        rejected: 2,
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

  getDashboardCount() {
    this.dataService.getDashboardCount().subscribe((response) => {
      this.dashboardCount = response;
      this.assessmentCount = Math.round(
        (this.dashboardCount.shortlisted / this.dashboardCount.assessment) * 100
      );
      console.log('Dashboard Count', Math.round(this.assessmentCount));
    });
  }

  ngOnDestroy() {
    this.managernameService.unsubscribe();
    this.dataService.unsubscribe();
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
