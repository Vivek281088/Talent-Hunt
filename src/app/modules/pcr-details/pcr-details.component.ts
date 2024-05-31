import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-pcr-details',
  templateUrl: './pcr-details.component.html',
  styleUrls: ['./pcr-details.component.scss'],
})
export class PcrDetailsComponent{
  constructor(private http : HttpClient){}
  @ViewChild('dt') dt !: Table;
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
