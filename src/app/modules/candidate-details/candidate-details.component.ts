import { Component, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Table } from 'primeng/table';
import { PcrService } from 'src/app/services/pcr.service';
import { formatJson } from 'src/app/shared/utils/formatJson';
import { transformDataToInputFields } from 'src/app/shared/utils/transformDataToInputFields';

@Component({
  selector: 'app-candidate-details',
  templateUrl: './candidate-details.component.html',
  styleUrls: ['./candidate-details.component.scss']
})
export class CandidateDetailsComponent {
  jsonData: any;
  activeIndex: number=0;
  constructor(private pcrService : PcrService){}
  @ViewChild('dt') dt !: Table;
  todayDate!: string | number | Date;
  candidateMappingDetails !: any;
  items: MenuItem[] = [
    { label: 'Home', routerLink: '/mtalent/thdashboard', icon: 'pi pi-home' },
    { label: 'Manage Candidates', routerLink: '/mtalent/resource' },
    { label: 'Candidate details', routerLink: '/mtalent/candidatedetails' },
  ];
    inputFields = [
        { label: 'Candidate ID', id: 'candidate', value: "sdfasdf"},
        { label: 'Candidate Name', id: 'candidatename', value: "dvasvd" },
        { label: 'Current Location', id: 'currentlocation', value: "vadvv" },
        { label: 'Email Id', id: 'emailid', value: "gewrgber" },
        { label: 'Experience', id: 'experience', value: "rgerger" },
        { label: 'Phone Number', id: 'phonenumber', value: "9787799646"},
        { label: 'Source', id: 'source', value:"jengkj" },
        { label: 'SPOC', id: 'spoc', value: "fbekhrfb" },
        { label: 'Primary Skills', id: 'primaryskills', value:"ufhkef" },
        { label: 'Secondary Skills', id: 'secondaryskills', value:"ufhkef" },
      ];
  ngOnInit(): void {
    const id = sessionStorage.getItem("currentResourceId") ? sessionStorage.getItem("currentResourceId")  : "" ;
    this.pcrService.getCandidate(id).subscribe(data => {
      this.inputFields = transformDataToInputFields(data);
    })
    this.pcrService.getCandidatePcrMapping(id).subscribe(data => {
      console.log(data);
      this.candidateMappingDetails = data
    })
  }
  candidateTableData = {
    headers: [
      {
        title: "PCR ID",
        sortable: true,
        filterable: true,
        filterMode: "contains",
        filterType: "input"
      },
      {
        title: "Test Status",
        sortable: true,
        filterable: true,
        filterMode: "contains",
        filterType: "input"
      },
      {
        title: "Current Status",
        sortable: false,
        filterable: true,
        filterMode: "contains",
        filterType: "input"
      },
      {
        title: "All Details",
        sortable: true,
        filterable: false
      }
    ]
  }

  applyFilter(value: any, field: string, mode: string) {
    this.dt.filter(value, field, mode);
  }
  allDetails(event : any , op : OverlayPanel , data : any){
    this.jsonData = formatJson(data);
    op.toggle(event);
  }
}


