import { Component, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { PcrService } from 'src/app/services/pcr.service';

@Component({
  selector: 'app-candidate-details',
  templateUrl: './candidate-details.component.html',
  styleUrls: ['./candidate-details.component.scss']
})
export class CandidateDetailsComponent {
  constructor(private pcrService : PcrService){}
  @ViewChild('dt') dt !: Table;
  todayDate!: string | number | Date;
  items: MenuItem[] = [
    { label: 'Home', routerLink: '/mtalent/thdashboard', icon: 'pi pi-home' },
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
      console.log("this input fieldssssssssss",this.inputFields)
    })
  }


  pcrTableData = {
    headers: [
      {
        title: "Emp Id",
        sortable: true,
        filterable: true,
        filterMode: "contains",
        filterType: "input"
      },
      {
        title: "Employee Name",
        sortable: true,
        filterable: true,
        filterMode: "contains",
        filterType: "input"
      },
      {
        title: "Schedule Name",
        sortable: false,
        filterable: true,
        filterMode: "contains",
        filterType: "input"
      },
      {
        title: "Current Staus",
        sortable: true,
        filterable: false
      }
    ],
    data: [
      {
        PCRid: "1",
        Jobtitle: "Software Developer",
        Requestresource: "John Doe",
        CreatedDate: "2023-01-15",
        Project_id: "P001",
        Skills: [
          "JavaScript",
          "React"
        ],
        PCRstatus: "Open",
        CreatedBy: "Alice",
        Location: "New York",
        Agileid: "A001"
      },
      {
        PCRid: "2",
        Jobtitle: "Project Manager",
        Requestresource: "Jane Smith",
        CreatedDate: "2023-02-20",
        Project_id: "P002",
        Skills: [
          "Project Management",
          "Agile"
        ],
        PCRstatus: "Closed",
        CreatedBy: "Bob",
        Location: "San Francisco",
        Agileid: "A002"
      },
    ]
  }

  applyFilter(value: any, field: string, mode: string) {
    this.dt.filter(value, field, mode);
  }
}

// utils.ts
// utils.ts
export function transformDataToInputFields(data: any, parentKey: string = ''): any[] {
  const inputFields: any = [];

  function processObject(obj: any, parentKey: string) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        let value = obj[key];
        const newKey = parentKey ? `${parentKey}. - ${key}` : key;

        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
          processObject(value, newKey);
        } else {
          if (Array.isArray(value)) {
            value = value.join(', ');
          } else if (typeof value === 'object' && value !== null) {
            value = JSON.stringify(value);
          }
          inputFields.push({
            label: newKey.replace(/([A-Z])/g, ' $1').replace(/\./g, ' ').replace(/^./, str => str.toUpperCase()),
            id: newKey,
            value
          });
        }
      }
    }
  }

  processObject(data, parentKey);
  inputFields.sort((a: { label: string; }, b: { label: any; }) => a.label.localeCompare(b.label));
  return inputFields;
}
