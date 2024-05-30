import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as Papa from 'papaparse';
import { saveAs } from 'file-saver';
import { Router } from '@angular/router';
import { NewScheduleService } from 'src/app/services/new-schedule.service';
import {
  ConfirmationService,
  MessageService,
} from 'primeng/api';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class ResourceComponent {


    items: MenuItem[] | undefined;
    todayDate!: Date;
    globalSearchValue!: string;
    candidateId: string = "2528625";
    candidateName: string = "Aishwarya Rajagopal";
    role: string = "Full Stack Developer";
    skillSet: string = "Angular, Nodejs";
    experience: string = "2 Years";
    source: string= "TFG";
    spoc: string = "Nirmala"
    location: string = "Offshore";
    
  
    constructor(
      private fb: FormBuilder,
      private messageService: MessageService,
      private router: Router,
      private confirmationService: ConfirmationService,
    ) {
  
    }
    ngOnInit() {
      sessionStorage.setItem('Component-Name', 'user');
  
      this.todayDate = new Date();
      console.log('Date--------', this.todayDate);
  
      this.items = [
        { label: 'Home', routerLink: '/mtalent/thdashboard', icon: 'pi pi-home' },
        { label: 'Manage-Candidates', routerLink: '/mtalent/pcr-mapping' },
      ];
    }
 
    clear(table: Table) {
      table.clear();
      this.globalSearchValue = '';
    }
  
  }


