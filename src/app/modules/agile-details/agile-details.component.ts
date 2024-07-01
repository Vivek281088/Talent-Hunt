import { Component } from '@angular/core';
import {

  Injector,
  OnInit,
  Signal,
  ViewChild,
  signal,
} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { PcrService } from 'src/app/services/pcr.service';
import { OverlayPanel } from 'primeng/overlaypanel';
import { transformDataToInputFields } from 'src/app/shared/utils/transformDataToInputFields';
import { formatJson } from 'src/app/shared/utils/formatJson';

@Component({
  selector: 'app-agile-details',
  templateUrl: './agile-details.component.html',
  styleUrls: ['./agile-details.component.scss']
})
export class AgileDetailsComponent {

  jsonData: any;
  constructor(private pcrService: PcrService, private injector: Injector) {}
  @ViewChild('dt') dt!: Table;
  todayDate!: string | number | Date;
  items: MenuItem[] = [
    { label: 'Home', routerLink: '/mtalent/thdashboard', icon: 'pi pi-home' },
    { label: 'PCR', routerLink: '/mtalent/manage-pcr' },
    { label: 'PCR details', routerLink: '/mtalent/pcrdetails' },
  ];
  inputFields: any = [];
  mappingDetails: any = [];
  ngOnInit(): void {
    let agileId=sessionStorage.getItem('AgileId')
    let id = sessionStorage.getItem('currentAgileId')

      ? sessionStorage.getItem('currentAgileId')
      : '';
    this.pcrService.getIndividualPCR(id).subscribe((data) => {
      this.mappingDetails = data.mappingDetails;
      console.log("mapiiiiiiiiiiiii",this.mappingDetails)
      this.inputFields = transformDataToInputFields(data.pcr);
      console.log("Before Transformation", data.pcr);
      console.log("After Transformation", this.inputFields);
    });
  }
  pcrTableData = {
    headers: [
      {
        title: 'Candidate Id',
        sortable: true,
        filterable: true,
        filterMode: 'contains',
        filterType: 'input',
      },
      {
        title: 'Test Status',
        sortable: false,
        filterable: true,
        filterMode: 'contains',
        filterType: 'input',
      },
      {
        title: 'Current Staus',
        sortable: true,
        filterable: false,
      },
      {
        title: 'All Details',
      },
    ],
  };

  applyFilter(value: any, field: string, mode: string) {
    this.dt.filter(value, field, mode);
  }
  allDetails(event: any, op: OverlayPanel, data: any) {
    this.jsonData = formatJson(data);
    op.toggle(event);
  }
}
