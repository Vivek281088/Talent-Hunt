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

  managerName : string='';
  skill: String[]= [];
  filteredSkill  :String[]= [];
  fskill:String[]= [];
  exdata: any[] = [];

  filterSkills: FilterSkill[] = [];

  filterManager: any;

  filteredData: any[] = [];

  isCreate: boolean = false;

  isEdit: boolean = false;

  isMail: boolean = false;

  create: boolean = false;

 

  Tdata: any[] = [];

  isCreateClicked = false;

  dropdownOptions: any[] = [];

  

  constructor(
    private tableService: TableService,

    private managernameService: ManagernameService,
    private skillsdropdownservice: SkillsdropdownService,
    private router: Router
  ) { }

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
        

        this.managernameService.setManagerName(this.selectedManager);

        console.log('manager', this.selectedManager);

       
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


 
  
  

 
   
  }

 


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


interface FilterSkill {
  _id: number;
  skill: string;
  subskills: string[]; 
  __v: number;
}
