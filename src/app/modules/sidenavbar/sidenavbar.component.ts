import { Component } from '@angular/core';
import { AuthService } from 'src/app/Guard/auth.service';

@Component({
  selector: 'app-sidenavbar',
  templateUrl: './sidenavbar.component.html',
  styleUrls: ['./sidenavbar.component.scss'],
})
export class SidenavbarComponent {
  assessmentShow: boolean = false;
  userShow: boolean = false;
  questionBankShow: boolean = false;
  systemShow: boolean = false;
  isSideNavCollapsed: boolean = false;
  activeSection: string = 'home';
  activeSublist: string = '';
  role: string | null = '';
  showSidebar!: boolean;

  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.changeStyle('home');
    this.shouldDisplaySidebar();
  }

  toggleSideNav() {
    this.isSideNavCollapsed = !this.isSideNavCollapsed;
  }

  changeStyle(section: string) {
    const sections = ['home', 'assessment', 'user', 'question_bank', 'system'];
    sections.forEach((sec) => {
      const element = document.getElementById(sec);
      if (element) {
        element.classList.remove('active');
      }
      const activeElement = document.getElementById(section);
      if (activeElement) {
        activeElement.classList.add('active');
      }
      this.activeSection = section;
    });
  }

  changeSublist(sublist: string) {
    const sublists = [
      'manageSchedule',
      'manageAssessment',
      'manageManagers',
      'manageCandidates',
      'manageSkills',
      'manageQuestions',
      'manageProfile',
      'configuration',
    ];
    sublists.forEach((sub) => {
      const sublistElement = document.getElementById(sub);
      if (sublistElement) {
        sublistElement.classList.remove('active');
      }
    });

    const activeSublistElement = document.getElementById(sublist);
    if (activeSublistElement) {
      activeSublistElement.classList.add('active');
    }

    this.activeSublist = sublist;
  }

  changeStyle1() {
    this.assessmentShow = !this.assessmentShow;
  }
  changeStyle2() {
    this.userShow = !this.userShow;
  }
  changeStyle3() {
    this.questionBankShow = !this.questionBankShow;
  }
  changeStyle4() {
    this.systemShow = !this.systemShow;
  }
  shouldDisplaySidebar() {
    this.role = localStorage.getItem('userrole');
    console.log('Role : ', this.role);
    if (this.role === 'manager') {
      this.showSidebar = true;
    }
  }
}