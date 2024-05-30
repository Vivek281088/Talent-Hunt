import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-manage-pcr',
  templateUrl: './manage-pcr.component.html',
  styleUrls: ['./manage-pcr.component.scss']
})
export class ManagePcrComponent {
    items:MenuItem[]  = [];
  todayDate!: Date;
  addPCR:boolean=false;
  addPCRForm!:FormGroup;
  formSubmitted:boolean=false

  pcrData:any;
  constructor(private route:Router,private fb:FormBuilder){
    this.addPCRForm=this.fb.group({
      pcrId:[null,[Validators.required,Validators.minLength(6)]],
      jobTitle:['',[Validators.required,Validators.minLength(3)]],
      createdDate:[null,[Validators.required]],
      projectId:[null,[Validators.required,Validators.minLength(4)]],
      skills:['',[Validators.required]],
      position_status:['',[Validators.required]],
      createdBy:['',[Validators.required]],
      Location:['',[Validators.required]]
    


    })

  }
  
  ngOnInit(){
    this.todayDate = new Date();
    this.items=[
      {label:'Home',routerLink:'/login',icon:'pi-pi-home'},
      {label:'PCR',routerLink:'/manage-pcr'}
    ]

  

}
addPcr(){
  this.addPCR=true;
      
}
cancelButton(){
  this.addPCR=false

}
}
