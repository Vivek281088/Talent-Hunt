import { Component, OnInit } from '@angular/core';

import { TableService } from 'src/app/services/table.service';

import { ManagernameService } from 'src/app/services/managername.service';

import { Router } from '@angular/router';

import { SkillsdropdownService } from '../services/skillsdropdown.service';

@Component({
  selector: 'app-schedulepage',

  templateUrl: './schedulepage.component.html',

  styleUrls: ['./schedulepage.component.scss'],
})
export class SchedulepageComponent implements OnInit {
  tables: any[] | undefined;

  cols!: Column[];

  selectedManager: string = '';

  managerOption: any[] = [];

  skillSet: any[] = [];

  selectedSkill: any[] = [];

  filterSkills: FilterSkill[] = [];

  filterManager: any;

  filteredData: any[] = [];

  isCreate: boolean = false;

  isEdit: boolean = false;

  isMail: boolean = false;

  create: boolean = false;

  // isCreateClicked:boolean=false;

  Tdata: any[] = [];

  isCreateClicked = false;

  dropdownOptions: any[] = [];

  // managerOption = [

  //   {name: "Alamelu", label: "Alamelu"},

  //   {name: "Sengamalam", label: "Sengamalam"},

  //   {name: "Suresh", label: "Suresh"}

  // ];

  constructor(
    private tableService: TableService,

    private managernameService: ManagernameService,

    private skillsdropdownservice: SkillsdropdownService,

    private router: Router
  ) {}

  ngOnInit() {
    this.loadManagerNames();

    this.getSkillSet();

    this.existingData();

    this.cols = [
      { field: 'manager', header: 'Manager' },

      { field: 'file name', header: 'File name' },

      { field: 'actions', header: 'Actions' },
    ];
  }

  getSkillSet() {
    this.skillsdropdownservice.getskillsList().subscribe((data) => {
      this.skillSet = data;
    });
  }

  // onSearchClick() {
  //   this.skillsdropdownservice

  //     .filterManager(this.filterManager?.Managername, this.filterSkills[0]?.skill)

  //     .subscribe((data) => {
  //       console.log('Api response', data);

  //       this.filteredData = data;

  //       this.Tdata = this.filteredData;

  //       console.log('filtered data', this.filteredData);

  //       // console.log('Tdata', this.Tdata);

  //       // console.log('Filter Manager:', this.filterManager);

  //       console.log('Filter Skills:', this.filterSkills);
  //     });
  // }

  onSearchClick() {
    const skillToFilter =
      this.filterSkills.length > 0 ? this.filterSkills[0].skill : undefined;
    this.skillsdropdownservice
      .filterManager(this.filterManager?.Managername, skillToFilter)
      .subscribe((data) => {
        console.log('Api response', data);
        this.filteredData = data;
        this.Tdata = this.filteredData;
        console.log('filtered data', this.filteredData);
        console.log('Filter Skills:', this.filterSkills);
      });
  }

  existingData() {
    this.tableService.getExistingData().subscribe((data) => {
      this.Tdata = data;

      //    console.log("tdata:", this.Tdata)

      //    this.isCreate = !data.isCreate;

      // this.isEdit = !data.isEdit;

      // this.isMail = !data.isMail;

      // console.log("create", this.isCreate);

      // console.log("edit", this.isEdit);

      // console.log("mail", this.isMail)
    });
  }

  loadManagerNames() {
    this.managernameService.getManagerNames().subscribe((data) => {
      this.managerOption = data;
    });
  }

  dropFunction(rowData: any) {
    rowData.isCreate = true;

    console.log('Drop down selected', rowData);

    this.tableService
      .postManagerList(this.selectedManager)
      .subscribe((data) => {
        //   console.log("Hi", data);

        //   this.isCreate = !data.create;

        //   this.isEdit = !data.edit;

        //   this.isMail = !data.mail;

        //   console.log("create", this.isCreate);

        //   console.log("edit", this.isEdit);

        //   console.log("mail", this.isMail)

        this.managernameService.setManagerName(this.selectedManager);

        console.log('manager', this.selectedManager);

        //   this.skillsdropdownservice.getskillsList().subscribe(data => {

        //     this.skillSet = data;

        //   });
      });
  }

  addNewRow() {
    const newRow = {
      manager: '',
      fileName: '',
      isCreate: false,
      isEdit: false,
      isMail: false,
    };

    // this.Tdata.push(newRow);

    // Set isCreateClicked to true to display the dropdown

    //this.create=true

    this.Tdata.unshift(newRow);
  }

  //filter ts
}

interface Column {
  field: string;

  header: string;
}

// interface ManagerFilter {
//   Managername: string;

//   Skill: string[];
// }
interface FilterSkill {
  _id: number;
  skill: string;
  subskills: string[]; 
  __v: number;
}
