import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-l1screen',
  templateUrl: './l1screen.component.html',
  styleUrls: ['./l1screen.component.scss']
})
export class L1screenComponent implements OnInit  {
  items: MenuItem[] | undefined;
  todayDate!: Date;
  date: Date | undefined;
   customers = [
    {
      name: "John Doe",
      country: {
        name: "United States"
      },
      representative: {
        name: "Jane Smith"
      },
      verified: true
    },
    {
      name: "Alice Johnson",
      country: {
        name: "Canada"
      },
      representative: {
        name: "Bob Brown"
      },
      verified: false
    },
    {
      name: "Mohammed Khan",
      country: {
        name: "United Kingdom"
      },
      representative: {
        name: "Emily Davis"
      },
      verified: true
    }
    // Add more customer objects as needed
  ];

ngOnInit(): void {
  this.items = [
    { label: 'Home', routerLink: '/login', icon: 'pi pi-home' },
     { label: 'L1SCREEN', routerLink: '/manage-managers' },
  ];
}
  // clear(table: Table) {
  //   table.clear();
  //   this.globalSearchValue = '';
  // }
}
