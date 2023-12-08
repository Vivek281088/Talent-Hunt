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
  isDropdownOpen: boolean = false;
  candidateName: string = '';
  candidateList: any[] = [];
 
  showCandidateEmail!: string;
 


  finalizedEmail!: string;
  userName!: string | null;
  userEmail!: string;
  userPhone!: number;
  name: boolean = false;
 
  isEditProfile: boolean = false;
 
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
    // this.finalizedEmail =
    //   this.managernameService.getCandidateAssessment_Email();
    // this.finalizedManagerEmail = this.managernameService.getManagerName_Email();
    //--------------------------------------
    this.authUserOrManager();
 
    // this.finalizedManagerEmail = localStorage.getItem('managerEmail')!;
    // this.finalizedEmail = localStorage.getItem('Candidateemail')!;
 
    // const a = localStorage.getItem('userrole');
 
    // //  this.finalizedEmail= this.managernameService.getCandidateAssessment_Email();
    // if (a == 'manager') {
    //   this.managernameService
    //     .getManagerdata_by_Email(this.finalizedManagerEmail)
    //     .subscribe((response) => {
    //       console.log('Navbar-res', response);
    //       this.tempUserName = response[0].Managername;
    //       this.userName = response[0].Managername;
    //       this.id = response[0].id;
    //       this.userEmail = response[0].candidateEmail;
    //       this.userPhone = response[0].phoneNumber;
 
    //       this.managernameService.setManagerName_Email(this.userEmail);
    //       this.name = true;
 
    //       // this.candidateName = response[0].candidateName;
    //     });
    // } else {
    //   this.candidateService
    //     .getCandidatedata_by_Email(this.finalizedEmail)
    //     .subscribe((response) => {
    //       this.name = false;
    //       this.candidateList = response;
    //       this.tempUserName = response[0].candidateName;
    //       this.userName = response[0].candidateName;
    //       this.id = response[0].id;
    //       this.userEmail = response[0].candidateEmail;
    //       this.userPhone = response[0].candidatePhone;
    //       console.log('candidateName', this.candidateName);
    //     });
    // }
  }
  authUserOrManager() {
    this.finalizedManagerEmail = localStorage.getItem('managerEmail')!;
    this.finalizedEmail = localStorage.getItem('Candidateemail')!;
 
    const a = localStorage.getItem('userrole');
 
    //  this.finalizedEmail= this.managernameService.getCandidateAssessment_Email();
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
 
          // this.candidateName = response[0].candidateName;
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
 
    //  this.finalizedEmail= this.managernameService.getCandidateAssessment_Email();
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
 
          // this.candidateName = response[0].candidateName;
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
    // Reload the current page
    window.location.reload();
  }
 
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
 
  redirectToProfile() {
    this.visible = true;
  }
 
  logout() {
    this.authservice.logout();
    localStorage.clear();
    // Redirect to the login page
    // Example: this.router.navigate(['/login']);
  }
  closedialog() {
    this.isEditProfile = false;
  }
 
  updateDetails() {
    if (this.isEditProfile) {
      const a = localStorage.getItem('userrole');
      if (a == 'manager') {
        const data = {
          Managername: this.tempUserName || this.userName,
          candidateEmail: this.userEmail,
          phoneNumber: this.userPhone,
          id: this.id,
        };
        console.log('profile data', data);
 
        this.candidateService
          .updateManagerProfile(data)
          .subscribe((response) => {
            console.log('Profile updated successfully', data);
          });
      } else {
        //For candidate
        const data = {
          candidateName: this.tempUserName || this.userName,
          candidateEmail: this.userEmail,
          candidatePhone: this.userPhone,
        };
 
        this.candidateService
          .updateCandidateProfile(data)
          .subscribe((response) => {
            console.log('Profile updated successfully', data);
          });
      }
 
      // this.authUserOrManager1();
      // this.refreshPage();
      this.isEditProfile = false;
    }
    this.authUserOrManager1();
    // this.refreshPage();
  }
 
  toggleEditProfile() {
    this.tempUserName = this.userName;
    this.isEditProfile = !this.isEditProfile;
  }
  getInitials(name: string | null): string {
    if (!name) {
      return '';
    }

    const names = name.split(' ');
    const initials = names.map((n) => n.charAt(0)).join('');
    return initials.toUpperCase();
  }



}
 

