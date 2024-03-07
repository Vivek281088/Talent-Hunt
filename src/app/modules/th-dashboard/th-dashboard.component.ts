import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-th-dashboard',
  templateUrl: './th-dashboard.component.html',
  styleUrls: ['./th-dashboard.component.scss'],
})
export class THDashboardComponent {
  items: MenuItem[] | undefined;
  home: MenuItem | undefined;
  todayDate!: Date;
  managerName!: string | null;

  ngOnInit() {
    sessionStorage.setItem('Component-Name', 'home');
    this.todayDate = new Date();
    this.items = [{ label: 'Dashboard', routerLink: '/thdashboard' }];
    this.home = {
      icon: 'pi pi-home',
      routerLink: '/thdashboard',
      label: 'Home',
    };
    this.managerName = localStorage.getItem('managerName');
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
