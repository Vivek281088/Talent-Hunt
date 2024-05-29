import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-pcr',
  templateUrl: './manage-pcr.component.html',
  styleUrls: ['./manage-pcr.component.scss']
})
export class ManagePcrComponent {
    items:MenuItem[]  = [];
  todayDate!: Date;
  pcrData:any;
  constructor(private route:Router){

  }
  
  ngOnInit(){
    this.todayDate = new Date();
    this.items=[
      {label:'Home',routerLink:'/login',icon:'pi-pi-home'},
      {label:'PCR',routerLink:'/manage-pcr'}
    ]

}
}
