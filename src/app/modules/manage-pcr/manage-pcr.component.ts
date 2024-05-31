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
  pcr$!:Observable<PCR[]>;

  constructor(private route: Router, private fb: FormBuilder,private store:Store) {
    this.addPCRForm = this.fb.group({
      pcrId: [null, [Validators.required, Validators.minLength(6)]],
      jobTitle: ['', [Validators.required, Validators.minLength(3)]],
      createdDate: [null, [Validators.required]],
      projectId: [null, [Validators.required, Validators.minLength(4)]],
      skills: ['', [Validators.required]],
      position_status: ['', [Validators.required]],
      createdBy: ['', [Validators.required]],
      Location: ['', [Validators.required]],
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
  addPcr() {
getPcr  }
  cancelButton() {
    this.addPCR = false;
    this.formSubmitted = false;
  }
  saveButton() {
    this.formSubmitted = true;

    if (this.addPCRForm.valid) {
      const formdata = this.addPCRForm.value;
      console.log('form data', formdata);
    }
  }
}
