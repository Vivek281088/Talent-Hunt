import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Guard/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
 
constructor(private authservice:AuthService){

}
  refreshPage() {
    // Reload the current page
    window.location.reload();
  }
  logout(){
  this.authservice.logout();
  }
}
