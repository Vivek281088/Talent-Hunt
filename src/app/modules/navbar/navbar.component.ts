import { Component } from '@angular/core';
import { AuthService } from 'src/app/Guard/auth.service';
import { ManagernameService } from 'src/app/services/managername.service';
import { CandidateAssessmentService } from 'src/app/services/candidate-assessment.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { Receiver } from '../new-schedule/new-schedule.component';
 
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  overlayVisible: boolean = false;
  notificationOverlayVisible: boolean = false;
  candidateName: string = '';
  candidateList: any[] = [];
  showCandidateEmail!: string;
  finalizedEmail!: string;
  userName!: string | null;
  userEmail!: string;
  userPhone!: number;
  name: boolean = false;
  modalVisible: boolean = false;
  isAdmin: boolean = false;
   finalizedManagerEmail!: string;
  visible: boolean = false;
  tempUserName!: string | null;
  id!: string;
  notification:any;
  receiver!:string;
  notifications !:any;
 
  constructor(
    private authservice: AuthService,
    private managernameService: ManagernameService,
    private candidateService: CandidateAssessmentService,
    private router : Router,
    private notificationService : NotificationService
  ) {}
  ngOnInit(): void {
    this.authUserOrManager();
    const storedNotifications = localStorage.getItem('notifications');
  if (storedNotifications) {
    this.notifications = JSON.parse(storedNotifications);
  }
 
  }
  notifydata(){
    const body = {
      receiver : this.receiver
    }
    console.log('Notification Body', body);
      this.notificationService.getNotification(body).subscribe((response)=>{
        console.log("notificaton service called",response)
        this.notifications = response;
      });
  }
 
  authUserOrManager() {
    this.finalizedManagerEmail = localStorage.getItem('managerEmail')!;
    this.finalizedEmail = localStorage.getItem('Candidateemail')!;
    const a = localStorage.getItem('userrole');
 
    if (a == 'manager') {
      this.isAdmin = true;
      this.managernameService
        .getManagerdata_by_Email(this.finalizedManagerEmail)
        .subscribe((response) => {
          console.log('Navbar-res', response);
          this.tempUserName =
          response[0].Firstname + ' ' + response[0].Lastname;
          this.userName = response[0].Firstname + ' ' + response[0].Lastname;
          this.receiver=response[0].id.toString();
          this.notifydata()
          console.log(this.receiver)
          this.id = response[0].id;
          this.userEmail = response[0].candidateEmail;
          this.userPhone = response[0].phoneNumber;
          console.log("iddd",this.id,response[0].id)
          sessionStorage.setItem('loginManagerId', this.id);
          this.managernameService.setManagerName_Email(this.userEmail);
          localStorage.setItem('managerName', this.userName);
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
          console.log("iddd",this.id,response[0].id)
          sessionStorage.setItem('loginManagerId', this.id);
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
          this.tempUserName =
            response[0].Firstname + ' ' + response[0].Lastname;
          this.userName = response[0].Firstname + ' ' + response[0].Lastname;
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
  changePassword() {
    this.router.navigate(['/resetpassword']);
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
  notificationToggle(){
    this.notificationOverlayVisible = !this.notificationOverlayVisible;
  }
 
  logout() {
    this.authservice.logout();
  }

//   clearNotification(notification: any) {
//     // const index = this.notifications.indexOf(notification);
//     // if (index !== -1) {
//     //   this.notifications.splice(index, 1);
//     //   this.notificationService.updateNotification(notification.notificationId, 
//     //     notification.receiverId).subscribe(() => {
//     //     console.log('Notification cleared successfully');
//     //   }, (error) => {
//     //     console.error('Error clearing notification:', error);
//     //   });
//     // this.notificationService.updateNotification(notification.notificationId, 
//           // notification.receiverId)
// console.log('Notifcation here', notification);
// const managerId = sessionStorage.getItem('loginManagerId') ;
// if(managerId){
//   this.notificationService.updateNotification(notification.id, 
//     managerId).subscribe(response=>{
//       console.log(response);
//     })
// }
//     }
clearNotification(notification: any) {
  console.log('Notifcation here', notification);
  const managerId = sessionStorage.getItem('loginManagerId');
  if(managerId){
    this.notificationService.updateNotification(notification.id, 
      managerId).subscribe(response=>{
        console.log(response);
        // Remove cleared notification from the array
        const index = this.notifications.indexOf(notification);
        if (index !== -1) {
          this.notifications.splice(index, 1);
        }
        // Check if all notifications are cleared
        if (this.notifications.length === 0) {
          // If all notifications are cleared, show "No Notifications to display"
          this.notifications = [];
        }
      });
  }
  }
}
