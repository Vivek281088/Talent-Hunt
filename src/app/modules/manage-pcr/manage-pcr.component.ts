import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
// import { Router } from 'express';

@Component({
  selector: 'app-manage-pcr',
  templateUrl: './manage-pcr.component.html',
  styleUrls: ['./manage-pcr.component.scss']
})
export class ManagePCRComponent {
  items:MenuItem[] | undefined;
  // constructor(private route:Router){

  // }

  ngOnInit(){
    this.items=[
      {label:'Home',routerLink:'/login',icon:'pi-pi-home'},
      {label:'PCR',routerLink:'/manage-pcr'}
    ]

  }

}
