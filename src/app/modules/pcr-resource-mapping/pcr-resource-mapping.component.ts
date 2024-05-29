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
  selector: 'app-pcr-resource-mapping',
  templateUrl: './pcr-resource-mapping.component.html',
  styleUrls: ['./pcr-resource-mapping.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class PcrResourceMappingComponent {
  items: MenuItem[] | undefined;
  todayDate!: Date;
  globalSearchValue!: string;

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
      { label: 'PCR-Emp Mapping', routerLink: '/mtalent/pcr-mapping' },
    ];
  }


  clear(table: Table) {
    table.clear();
    this.globalSearchValue = '';
  }

}
