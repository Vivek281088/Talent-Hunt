import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-pcr-details',
  templateUrl: './pcr-details.component.html',
  styleUrls: ['./pcr-details.component.scss'],
})
export class PcrDetailsComponent {
  todayDate!: string | number | Date;
  items: MenuItem[] = [
    { label: 'Home', routerLink: '/mtalent/thdashboard', icon: 'pi pi-home' },
    { label: 'PCR details', routerLink: '/mtalent/pcrdetails' },
  ];

  inputFields = [
    { label: 'PCR ID', id: 'PCRID', value: 'PCR1234513' },
    { label: 'Agile One Id', id: 'agileid', value: 'AI534533' },
    { label: 'Job Title', id: 'jobtitile', value: 'Frontend Developer' },
    { label: 'Created By', id: 'createdby', value: 'Emily Brown' },
    { label: 'Created Date', id: 'createddate', value: '2023-05-27T12:34:56Z' },
    { label: 'Schedule Name', id: 'schedulename', value: 'PCR1234513_softwareEngineer' },
    { label: 'Onsite/Offshore', id: 'location', value: 'Onsite' },
    { label: 'PCR Status', id: 'pcrstatus', value: 'Open' },
    { label: 'Request Resource', id: 'request', value: 'Agile One' },
  ];
}
