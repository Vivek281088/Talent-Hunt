import { Component } from '@angular/core';
import { AuthService } from 'src/app/Guard/auth.service';

@Component({
  selector: 'app-sidenavbar',
  templateUrl: './sidenavbar.component.html',
  styleUrls: ['./sidenavbar.component.scss'],
})
export class SidenavbarComponent {
  assessmentShow: boolean = true;
  userShow: boolean = true;
  questionBankShow: boolean = true;
  isSideNavCollapsed: boolean = false;
  pcrShow:boolean=true;
  activeSection: string = 'home';
  activeSublist: string = '';
  role: string | null = '';
  showSidebar!: boolean;
  assessmentIconRotated: boolean = false;
  userIconRotated: boolean= false;
  questionBankIconRotated: boolean= false;
  pcrRotated : boolean =false;

  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    const defaultPage=sessionStorage.getItem("Component-Name")
    this.changeStyle(defaultPage);
    console.log('defaultPage--',defaultPage);
    this.shouldDisplaySidebar();
  }
  toggleAssessmentRotation() {
    this.assessmentIconRotated = !this.assessmentIconRotated;
  }

  toggleUserRotation() {
    this.userIconRotated = !this.userIconRotated;
  }

  toggleQuestionBankRotation(){
    this.questionBankIconRotated= !this.questionBankIconRotated;
  }

  toggleSideNav() {
    this.isSideNavCollapsed = !this.isSideNavCollapsed;
  }
  togglePcrRotation(){
    this.pcrRotated =!this.pcrRotated
  }

  changeStyle(section: any) {
    const sections = ['home', 'assessment', 'user', 'question_bank','pcr'];
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
      sessionStorage.setItem(this.activeSection, section);
      console.log("Active component", this.activeSection);
    });
  }

  changeSublist(sublist: string,section: string) {
    const sublists = [
      'manageSchedule',
      'manageAssessment',
      'manageManagers',
      'manageCandidates',
      'manageSkills',
      'manageQuestions',
      'managePCR',
      'pcrMapping'
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

    this.changeStyle(section);
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
  changeStyle5() {
    this.pcrShow = !this.pcrShow;
  }
  shouldDisplaySidebar() {
    this.role = localStorage.getItem('userrole');
    console.log('Role : ', this.role);
    if (this.role === 'manager') {
      this.showSidebar = true;
    }
  }
}
