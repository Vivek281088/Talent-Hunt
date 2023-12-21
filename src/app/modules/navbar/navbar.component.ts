import { Component } from '@angular/core';
import { AuthService } from 'src/app/Guard/auth.service';
import { ManagernameService } from 'src/app/services/managername.service';
import { CandidateAssessmentService } from 'src/app/services/candidate-assessment.service';
 
 
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
 
 
  overlayVisible: boolean = false;
  candidateName: string = '';
  candidateList: any[] = [];
  showCandidateEmail!: string;
  finalizedEmail!: string;
  userName!: string | null;
  userEmail!: string;
  userPhone!: number;
  name: boolean = false;
  modalVisible: boolean = false;
 
 
  finalizedManagerEmail!: string;
  visible: boolean = false;
  tempUserName!: string | null;
  id!: number;
 
  constructor(
    private authservice: AuthService,
    private managernameService: ManagernameService,
    private candidateService: CandidateAssessmentService
  ) {}
  ngOnInit(): void {
 
    this.authUserOrManager();
 
 
  }
  authUserOrManager() {
    this.finalizedManagerEmail = localStorage.getItem('managerEmail')!;
    this.finalizedEmail = localStorage.getItem('Candidateemail')!;
 
    const a = localStorage.getItem('userrole');
 
    if (a == 'manager') {
      this.managernameService
        .getManagerdata_by_Email(this.finalizedManagerEmail)
        .subscribe((response) => {
          console.log('Navbar-res', response);
          this.tempUserName = response[0].Firstname + ' '+ response[0].Lastname;
          this.userName = response[0].Firstname + ' '+ response[0].Lastname;
          this.id = response[0].id;
          this.userEmail = response[0].candidateEmail;
          this.userPhone = response[0].phoneNumber;
 
          this.managernameService.setManagerName_Email(this.userEmail);
          this.name = true;
 
        });
    } else {
      this.candidateService
        .getCandidatedata_by_Email(this.finalizedEmail)
        .subscribe((response) => {
          this.name = false;
          this.candidateList = response;
          this.tempUserName = response[0].candidateName;
          this.userName = response[0].candidateName;
          this.id = response[0].id;
          this.userEmail = response[0].candidateEmail;
          this.userPhone = response[0].candidatePhone;
          console.log('candidateName', this.candidateName);
        });
    }
  }
 
  authUserOrManager1() {
    this.finalizedManagerEmail = localStorage.getItem('managerEmail')!;
    this.finalizedEmail = localStorage.getItem('Candidateemail')!;
 
    const a = localStorage.getItem('userrole');
 
    if (a == 'manager') {
      this.managernameService
        .getManagerdata_by_Email(this.finalizedManagerEmail)
        .subscribe((response) => {
          console.log('Navbar-res', response);
          this.tempUserName = response[0].Firstname + ' '+ response[0].Lastname;
          this.userName = response[0].Firstname + ' '+ response[0].Lastname;
          this.id = response[0].id;
          this.userEmail = response[0].candidateEmail;
          this.userPhone = response[0].phoneNumber;
 
          this.managernameService.setManagerName_Email(this.userEmail);
          this.name = true;
 
        });
    } else {
      this.candidateService
        .getCandidatedata_by_Email(this.finalizedEmail)
        .subscribe((response) => {
          this.name = false;
          this.candidateList = response;
          this.tempUserName = response[0].candidateName;
          this.userName = response[0].candidateName;
          this.id = response[0].id;
          this.userEmail = response[0].candidateEmail;
          this.userPhone = response[0].candidatePhone;
          console.log('candidateName', this.candidateName);
        });
    }
    this.refreshPage();
  }
 
  refreshPage() {
    window.location.reload();
  }
 
  getInitials(name: string | null): string {
    if (!name) {
      return '';
    }
 
    const names = name.split(' ');
    const initials = names.map((n) => n.charAt(0)).join('');
    return initials.toUpperCase();
  }
 
  toggle() {
    this.overlayVisible = !this.overlayVisible;
}
 
logout(){
  this.authservice.logout();
}
 }
 
 