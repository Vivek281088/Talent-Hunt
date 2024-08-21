import { HttpClient } from '@angular/common/http';
import {
  Component,
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
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-pcr-details',
  templateUrl: './pcr-details.component.html',
  styleUrls: ['./pcr-details.component.scss'],
})
export class PcrDetailsComponent implements OnInit {
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
    let id = sessionStorage.getItem('currentPCRid')
      ? sessionStorage.getItem('currentPCRid')
      : '';
    this.pcrService.getIndividualPCR(id).subscribe((data) => {
      this.mappingDetails = data.mappingDetails;
      console.log("Mapping Details------",this.mappingDetails);
      this.inputFields = transformDataToInputFields(data.pcr);
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
