import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PcrActions } from 'src/app/store/pcr/pcr.action';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {PCR} from 'src/app/store/pcr/pcr.action';
import { getPcr } from 'src/app/store/pcr/pcr.selector';
@Component({
  selector: 'app-manage-pcr',
  templateUrl: './manage-pcr.component.html',
  styleUrls: ['./manage-pcr.component.scss'],
})
export class ManagePcrComponent {
  items: MenuItem[] = [];
  todayDate!: Date;
  addPCR: boolean = false;
  addPCRForm!: FormGroup;
  formSubmitted: boolean = false;
  pcrData: any;
  status:string[]=['open','closed','Available']
  pcr$!:Observable<PCR[]>;
  editPCR:boolean=false;
  // createdDate!:Date;

  constructor(private router: Router, private fb: FormBuilder,private store:Store) {
    this.addPCRForm = this.fb.group({
      agileId:[null,[Validators.required,Validators.minLength(6)]],
      pcrId: [null, [Validators.required, Validators.minLength(6)]],
      jobTitle: ['', [Validators.required, Validators.minLength(3)]],
      createdDate: [null, [Validators.required]],
      projectId: [null, [Validators.required, Validators.minLength(4)]],
      skills: ['', [Validators.required]],
      pcrStatus: ['', [Validators.required]],
      createdBy: ['', [Validators.required]],
      location: ['', [Validators.required]],
      SheduleName:['', [Validators.required]]
    });
    this.pcr$=this.store.select(getPcr);
  }

  ngOnInit() {
    this.todayDate = new Date();
    this.items = [
      { label: 'Home', routerLink: '/login', icon: 'pi-pi-home' },
      { label: 'PCR', routerLink: '/manage-pcr' },
    ];

    this.store.dispatch(PcrActions.getPCR());
    this.pcr$.subscribe((pcr)=>{
      this.pcrData=pcr

      console.log("pcr data from comp",this.pcrData)
    })


  }
  individualPCR(id : string) {
    sessionStorage.setItem("currentPCRid",id)
    this.router.navigate(['/mtalent/pcrdetails'])
  }
  addPcr() {
    this.addPCR=true


 }
  cancelButton() {
    this.addPCR = false;
    this.formSubmitted = false;
  }
  saveButton() {
    this.formSubmitted = true;
  
console.log("save button")
    if (this.addPCRForm.valid) {
      const formdata = this.addPCRForm.value;
      console.log('form data', formdata);
      const pcr :PCR = {
        pcrId: formdata.pcrId,
        agileId:  formdata.agileId,
        createdBy: formdata.createdBy,
        createdDate: formdata.createdDate.toLocaleDateString('en-US'),
        jobTitle:  formdata.jobTitle,
        location: formdata.location,
        pcrStatus: formdata?.pcr_status,
        projectId:formdata.projectId,
        requestResource:formdata.requestResource,
        skills:formdata.skills,
        scheduleName:formdata.scheduleName
      }
      console.log("save button",pcr)
      this.store.dispatch(PcrActions.addPCR({pcr}))
    }
  }
  editData(data:any){
  
this.editPCR=true
console.log("edit data",data)
if(data){
  this.addPCRForm.patchValue({
    agileId:data.agileId,
    pcrId: data.pcrId,
    jobTitle:data.jobTitle,
    createdDate: data.createdDate,
    projectId:data.projectId,
    skills: data.skills,
    pcr_status:data.pcrStatus,
    createdBy:data.createdBy,
    location:data.location,
    SheduleName:data.SheduleName

  })
}
  }
  updateButton(){
    console.log("data to be updated",this.addPCRForm.value);
    const formdata=this.addPCRForm.value
    const pcr:PCR={
      pcrId: formdata.pcrId,
      agileId:  formdata.agileId,
      createdBy: formdata.createdBy,
      createdDate: formdata.createdDate,
      jobTitle:  formdata.jobTitle,
      location: formdata.location,
      pcrStatus: formdata?.pcr_status,
      projectId:formdata.projectId,
      requestResource:formdata.requestResource,
      skills:formdata.skills,
      scheduleName:formdata.scheduleName

    }
    this.store.dispatch(PcrActions.updatePCR({pcr}))
    this.editPCR=false

  }
}
