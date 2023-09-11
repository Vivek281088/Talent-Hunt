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

  

  onSearchClick() {
    const skillToFilter = this.filterSkills.length > 0 ? this.filterSkills[0].skill : undefined;
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
// tableData1()
// {
//   this.tableService.getTableData().subscribe(data => {
//     this.tableData1 = data;
//     console.log("tdata:",this.tableData1)
//   });

// }
  
 
  
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
    this.Tdata.unshift(newRow);
  }

    // this.Tdata.push(newRow);

    // Set isCreateClicked to true to display the dropdown

    //this.create=true


  

  // filterSearch() {
  //    this.filterSkills = [];
  //   for (let item of this.selectedSkill) {

  //   this.filterSkills.push(item.skill)

  //   }
  //   console.log(this.filterSkills);
    
  //   this.skillsdropdownservice.filterSkill(this.filterSkills,this.filterManager).subscribe(response => {
  //     console.log("Hello from FilterSearch", response);
  //   this.Tdata1 = response;
   
  // });
  // }

 
  
  

 
   
  }

  //filter ts


interface Column {
  field: string;

  header: string;
}
interface ManagerFilter {
  Managername: string,
  Skill : string[]
}
interface SkillFilter{
  Skill : string[]
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
