import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { ManagernameService } from 'src/app/services/managername.service';

@Component({
  selector: 'app-manage-managers',
  templateUrl: './manage-managers.component.html',
  styleUrls: ['./manage-managers.component.scss'],
})
export class ManageManagersComponent {
  items: MenuItem[] | undefined;
  todayDate!: string;
  managerData: any;
  managerNames!: string;
  elipsisOverlayVisible: boolean = false;
  uniqueDepartment:any;
  globalSearchValue!: string;

  constructor(private managerService: ManagernameService) {}
  ngOnInit() {
    this.managerService.getclientManagerData().subscribe((response) => {
      console.log('Client Manager Details', response);
      this.managerData = response;

      this.uniqueDepartment =this.getUniqueDepartments(this.managerData);
      console.log('Unique Department', this.uniqueDepartment);

      
    });

    this.managerService.getclientManagerName().subscribe((response) => {
      console.log('Client Manager Names-->', response);
      this.managerNames = response;
    });
    this.todayDate = this.formattedDate(new Date());
    console.log('Date--------', this.todayDate);

    this.items = [
      { label: 'Home', routerLink: '/login', icon: 'pi pi-home' },
      { label: 'Managers', routerLink: '/manage-managers' },
    ];
  }
  formattedDate(date: Date) {
    const months: string[] = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    const month: string = months[date.getMonth()];
    const day: number = date.getDate();
    const year: number = date.getFullYear();
    const formatDate: string = `${month} ${day}, ${year}`;

    return formatDate;
  }
  clear(table: Table) {
    table.clear();
    this.globalSearchValue="";
  }
  handleElipsis() {
    this.elipsisOverlayVisible = !this.elipsisOverlayVisible;
  }
  getUniqueDepartments(data: any[]): any[] {
    const uniqueDepartments = Array.from(new Set(data.map(item => item.department)));
    return uniqueDepartments.map(department => {
      const matchingObject = data.find(item => item.department === department);
      return matchingObject;
    });
  }
}
