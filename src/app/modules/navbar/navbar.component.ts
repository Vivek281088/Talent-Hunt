import { Component } from '@angular/core';
import { AuthService } from 'src/app/Guard/auth.service';
import { ManagernameService } from 'src/app/services/managername.service';
import { CandidateAssessmentService } from 'src/app/services/candidate-assessment.service';
 


 
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isDropdownOpen: boolean = false;
  candidateName: string = '';
  candidateList: any[] = [];
 
  showCandidateEmail!: string;
 
  finalizedEmail!: string;
  userName !: string;
  userEmail !:string;
  userPhone !: number;
  name:boolean=false;

  isEditProfile: boolean = false;
 
  finalizedManagerEmail !: string;
  visible: boolean = false;
 
  constructor(private authservice: AuthService,
  private managernameService :ManagernameService,
  private candidateService: CandidateAssessmentService) {}
  ngOnInit(): void {
    this.finalizedEmail = this.managernameService.getCandidateAssessment_Email()
    this.finalizedManagerEmail  = this.managernameService.getManagerName();


const a=localStorage.getItem("userrole");
 
    //  this.finalizedEmail= this.managernameService.getCandidateAssessment_Email();
    if(a=="manager"){this.managernameService
      .getManagerdata_by_Email(this.finalizedManagerEmail)
      .subscribe((response) => {
        console.log('res', response);
        this.userName = response[0].Managername;
        this.userEmail = response[0].candidateEmail;
        this.userPhone = response[0].phoneNumber;
       
        this.managernameService.setManagerName_Email(this.userEmail);
        this.name=true;
      
        // this.candidateName = response[0].candidateName;
       
      });
    }
    else{
      this.candidateService
      .getCandidatedata_by_Email(this.finalizedEmail)
      .subscribe((response) => {
        this.name=false;
        this.candidateList = response;
      
        this.userName = response[0].candidateName;
        
        this.userEmail = response[0].candidateEmail;
        this.userPhone = response[0].candidatePhone;
        console.log('candidateName', this.candidateName);
      });
 
    }
   
   
  }
 
 
  refreshPage() {
    // Reload the current page
    window.location.reload();
  }
 
  toggleDropdown() {
   
    this.isDropdownOpen = !this.isDropdownOpen;
  }
 
 
  redirectToProfile()  {
    this.visible = true;
  }
 
  logout() {
    this.authservice.logout();
    // Redirect to the login page
    // Example: this.router.navigate(['/login']);
  }
  closedialog(){
    
  }

  updateDetails() {
    // if (this.isEditProfile) {
      
    //   this.candidateService.updateCandidateProfile({
    //     candidateName: this.candidateName,
    //     candidateEmail: this.showCandidateEmail,
    //     phoneNumber: this.phoneNumber,
    //   }).subscribe((response) => {
    //     // Handle the response, e.g., show a success message
    //     console.log('Profile updated successfully');
    //   });
  
    //   this.isEditProfile = false;
    // }
  }
  

  toggleEditProfile() {
    this.isEditProfile = !this.isEditProfile;
  }

}