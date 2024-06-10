import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { PcrService } from 'src/app/services/pcr.service';
import { transformDataToInputFields } from '../candidate-details/candidate-details.component';
import { OverlayPanel } from 'primeng/overlaypanel';

@Component({
  selector: 'app-pcr-details',
  templateUrl: './pcr-details.component.html',
  styleUrls: ['./pcr-details.component.scss'],
})
export class PcrDetailsComponent implements OnInit{
jsonData: any;
  constructor(private pcrService:PcrService){}
  @ViewChild('dt') dt !: Table;
  todayDate!: string | number | Date;
  items: MenuItem[] = [
    { label: 'Home', routerLink: '/mtalent/thdashboard', icon: 'pi pi-home' },
    { label: 'PCR details', routerLink: '/mtalent/pcrdetails' },
  ];
  inputFields : any = [];
  mappingDetails : any = []
  ngOnInit(): void {
    const id = sessionStorage.getItem("currentPCRid") ? sessionStorage.getItem("currentPCRid")  : "" ;
    this.pcrService.getIndividualPCR(id).subscribe(data => {
      this.mappingDetails = data.mappingDetails
      console.log("data....................................",data)
      this.inputFields = transformDataToInputFields(data.pcr)
    })

  }


  pcrTableData = {
    headers: [
      {
        title: "Candidate Id",
        sortable: true,
        filterable: true,
        filterMode: "contains",
        filterType: "input"
      },
      {
        title: "Candidate Name",
        sortable: true,
        filterable: true,
        filterMode: "contains",
        filterType: "input"
      },
      {
        title: "Test Status",
        sortable: false,
        filterable: true,
        filterMode: "contains",
        filterType: "input"
      },
      {
        title: "Current Staus",
        sortable: true,
        filterable: false
      },
      {
        title: "All Details",
      }
    ],
  }

  applyFilter(value: any, field: string, mode: string) {
    this.dt.filter(value, field, mode);
  }
  allDetails(event : any , op : OverlayPanel , data : any){
    this.jsonData = this.formatJson(data);
    op.toggle(event);
  }
  formatJson(json: any): string {
    const jsonString = JSON.stringify(json, null, 2);
    return jsonString
      .replace(/\"([^(\")"]+)\":/g, '<span class="json-key">"$1"</span>:')
      .replace(/: \"([^\"]*)\"/g, ': <span class="json-value">"$1"</span>')
      .replace(/: (\d+)/g, ': <span class="json-value">$1</span>');
  }
} 
