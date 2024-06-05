import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { PcrService } from 'src/app/services/pcr.service';

@Component({
  selector: 'app-pcr-details',
  templateUrl: './pcr-details.component.html',
  styleUrls: ['./pcr-details.component.scss'],
})
export class PcrDetailsComponent implements OnInit{
  constructor(private pcrService:PcrService){}
  @ViewChild('dt') dt !: Table;
  todayDate!: string | number | Date;
  items: MenuItem[] = [
    { label: 'Home', routerLink: '/mtalent/thdashboard', icon: 'pi pi-home' },
    { label: 'PCR details', routerLink: '/mtalent/pcrdetails' },
  ];
  inputFields : any = [];
  ngOnInit(): void {
    console.log("data from pcr details")
    const id = sessionStorage.getItem("currentPCRid") ? sessionStorage.getItem("currentPCRid")  : "" ;
    this.pcrService.getIndividualPCR(id).subscribe(data => {
      console.log("data from pcr details...........", sessionStorage.getItem("currentPCRid") , data)
      this.inputFields = [
        { label: 'PCR ID', id: 'PCRID', value: data.pcrId},
        { label: 'Agile One Id', id: 'agileid', value: data.agileId },
        { label: 'Job Title', id: 'jobtitile', value: data.jobTitle },
        { label: 'Created By', id: 'createdby', value: data.createdBy },
        { label: 'Created Date', id: 'createddate', value: data.createdDate },
        { label: 'Schedule Name', id: 'schedulename', value: data.scheduleName},
        { label: 'Onsite/Offshore', id: 'location', value:data.location },
        { label: 'PCR Status', id: 'pcrstatus', value: data.pcrStatus },
        { label: 'Request Resource', id: 'request', value:data.requestResource },
      ];
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
      {
        PCRid: "3",
        Jobtitle: "QA Engineer",
        Requestresource: "Emily Jones",
        CreatedDate: "2023-03-10",
        Project_id: "P003",
        Skills: [
          "Testing",
          "Selenium"
        ],
        PCRstatus: "In Progress",
        CreatedBy: "Charlie",
        Location: "Austin",
        Agileid: "A003"
      },
      {
        PCRid: "3",
        Jobtitle: "QA Engineer",
        Requestresource: "Emily Jones",
        CreatedDate: "2023-03-10",
        Project_id: "P003",
        Skills: [
          "Testing",
          "Selenium"
        ],
        PCRstatus: "In Progress",
        CreatedBy: "Charlie",
        Location: "Austin",
        Agileid: "A003"
      },
      {
        PCRid: "3",
        Jobtitle: "QA Engineer",
        Requestresource: "Emily Jones",
        CreatedDate: "2023-03-10",
        Project_id: "P003",
        Skills: [
          "Testing",
          "Selenium"
        ],
        PCRstatus: "In Progress",
        CreatedBy: "Charlie",
        Location: "Austin",
        Agileid: "A003"
      },
      {
        PCRid: "3",
        Jobtitle: "QA Engineer",
        Requestresource: "Emily Jones",
        CreatedDate: "2023-03-10",
        Project_id: "P003",
        Skills: [
          "Testing",
          "Selenium"
        ],
        PCRstatus: "In Progress",
        CreatedBy: "Charlie",
        Location: "Austin",
        Agileid: "A003"
      },
      {
        PCRid: "3",
        Jobtitle: "QA Engineer",
        Requestresource: "Emily Jones",
        CreatedDate: "2023-03-10",
        Project_id: "P003",
        Skills: [
          "Testing",
          "Selenium"
        ],
        PCRstatus: "In Progress",
        CreatedBy: "Charlie",
        Location: "Austin",
        Agileid: "A003"
      },
      {
        PCRid: "3",
        Jobtitle: "QA Engineer",
        Requestresource: "Emily Jones",
        CreatedDate: "2023-03-10",
        Project_id: "P003",
        Skills: [
          "Testing",
          "Selenium"
        ],
        PCRstatus: "In Progress",
        CreatedBy: "Charlie",
        Location: "Austin",
        Agileid: "A003"
      },
      {
        PCRid: "3",
        Jobtitle: "QA Engineer",
        Requestresource: "Emily Jones",
        CreatedDate: "2023-03-10",
        Project_id: "P003",
        Skills: [
          "Testing",
          "Selenium"
        ],
        PCRstatus: "In Progress",
        CreatedBy: "Charlie",
        Location: "Austin",
        Agileid: "A003"
      },
      {
        PCRid: "3",
        Jobtitle: "QA Engineer",
        Requestresource: "Emily Jones",
        CreatedDate: "2023-03-10",
        Project_id: "P003",
        Skills: [
          "Testing",
          "Selenium"
        ],
        PCRstatus: "In Progress",
        CreatedBy: "Charlie",
        Location: "Austin",
        Agileid: "A003"
      }
    ]
  }

  applyFilter(value: any, field: string, mode: string) {
    this.dt.filter(value, field, mode);
  }
 
}
