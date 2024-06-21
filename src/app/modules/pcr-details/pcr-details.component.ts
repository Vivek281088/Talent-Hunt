import { HttpClient } from '@angular/common/http';
import { Component, Injector, OnInit, Signal, ViewChild, signal } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { PcrService } from 'src/app/services/pcr.service';
import { OverlayPanel } from 'primeng/overlaypanel';
import { transformDataToInputFields } from 'src/app/shared/utils/transformDataToInputFields';
import { formatJson } from 'src/app/shared/utils/formatJson';
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-pcr-details',
  templateUrl: './pcr-details.component.html',
  styleUrls: ['./pcr-details.component.scss'],
})
export class PcrDetailsComponent implements OnInit{
  jsonData: any;
  constructor(private pcrService:PcrService,private injector : Injector){}
  @ViewChild('dt') dt !: Table;
  todayDate!: string | number | Date;
  items: MenuItem[] = [
    { label: 'Home', routerLink: '/mtalent/thdashboard', icon: 'pi pi-home' },
    { label: 'PCR', routerLink: '/mtalent/manage-pcr' },
    { label: 'PCR details', routerLink: '/mtalent/pcrdetails' },
  ];
  inputFields : any = [];
  mappingDetails : any = []
  ngOnInit(): void {
    let id = sessionStorage.getItem("currentPCRid") ? sessionStorage.getItem("currentPCRid")  : "";
    this.pcrService.getIndividualPCR(id).subscribe(data => {
      this.mappingDetails = data.mappingDetails
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
    this.jsonData = formatJson(data);
    op.toggle(event);
  }
  onUpload(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader: FileReader = new FileReader();
      const tempdata = reader.readAsBinaryString(file);
      console.log("temp data", tempdata);
      reader.onload = (event) => {
       console.log(event)
        let binaryData = event.target?.result;
        let workbook = XLSX.read(binaryData,{type : 'binary'});
        console.log(workbook)
        workbook.SheetNames.forEach(sheet => {
          const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet])
          const value = this.formatData(data)
          if(value.length > 0){
            this.pcrService.addAgile1Details(value).subscribe(data => {
              console.log("data fromt he backend " , data)
            });
          }
          console.log("value foom the excel" , value)
        })
      };
    }

  }
  formatData(data : any){
    let lastEntryWithId : any
    return data.reduce((result: any[], item: { ID: string; Job_Status: any; Job_Vendor_Submitted: any; Name: any; Numubers: any; }) => {
      if (item.ID) {
        const entry = { ...item, employeeDetails: [] };
        result.push(entry);
        lastEntryWithId = entry;
      } else if (lastEntryWithId && item.ID === "") {
        const additionalDetail = {
          Job_Status: item.Job_Status,
          Job_Vendor_Submitted: item.Job_Vendor_Submitted,
          Name: item.Name,
          Numubers: item.Numubers,
        };
        lastEntryWithId.employeeDetails.push(additionalDetail);
      }
      return result;
    }, []);
  }
 
} 
