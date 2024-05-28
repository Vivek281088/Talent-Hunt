import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pcr-manage',
  templateUrl: './pcr-manage.component.html',
  styleUrls: ['./pcr-manage.component.scss']
})
export class PcrManageComponent {
  items:MenuItem[] | undefined;
  constructor(private route:Router){

  }

  ngOnInit(){
    this.items=[
      {label:'Home',routerLink:'/login',icon:'pi-pi-home'},
      {label:'PCR',routerLink:'/manage-pcr'}
    ]

}
}
