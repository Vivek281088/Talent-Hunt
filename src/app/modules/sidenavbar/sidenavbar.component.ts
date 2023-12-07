import { Component } from '@angular/core';

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

  toggleSideNav() {
    this.isSideNavCollapsed = !this.isSideNavCollapsed;
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
}
