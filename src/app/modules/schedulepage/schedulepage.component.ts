import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { TableService } from 'src/app/services/table.service';

import { ManagernameService } from 'src/app/services/managername.service';

import { Router } from '@angular/router';

import { SkillsdropdownService } from '../../services/skillsdropdown.service';

import { response } from 'express';

@Component({
  selector: 'app-schedulepage',

  templateUrl: './schedulepage.component.html',

  styleUrls: ['./schedulepage.component.scss'],
})
export class SchedulepageComponent implements OnInit {
  tables: any[] | undefined;

  cols!: Column[];

  candidateNames: any[] = [];

  selectedCandidates: string = '';

  selectedManager: string = '';

  managerOption: any[] = [];

  candidateList: any[] = [];

  skillSet: any[] = [];

  selectedSkill: any[] = [];

  managerName: string = '';

  skill: String[] = [];

  filteredSkill: String[] = [];

  fskill: String[] = [];

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

  email_Managername!: string;

  email_Status!: string;

  email_Filename!: string;

  questions : any;

  filterCandidateName: string[]=[];
  filterStatus: string = '';



  names: string[] = [];
  status: string = '';
  CandidatefilteredData: any[] = [];

  // Define options for dropdowns
  candidateNameOptions: any[] = []; // Replace with actual data
  statusOptions: any[] = []; // Replace with actual data

// filter new
// Populate with manager options
 // Populate with status options
   // Selected manager for filtering
   // Selected status for filtering (use an array for multiselect)
   // Populate with candidate data
  filterPopupVisible: boolean = false;
  refreshSecondTab: boolean | undefined;
 

  constructor(
    private tableService: TableService,

    private managernameService: ManagernameService,

    private skillsdropdownservice: SkillsdropdownService,

    private router: Router,

    private cdr: ChangeDetectorRef
    
  ) {}

  ngOnInit() {
    this.loadManagerNames();

    this.getSkillSet();

    this.existingData();

    this.loadCandidate();

    this.getCandidatename();
    this.submitFilter();

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
    });
  }

  loadManagerNames() {
    this.managernameService.getManagerNames().subscribe((data) => {
      this.managerOption = data;
    });
  }

  onTabChange(event: any) {
    if (event.index === 1) {
      this.loadCandidate();
    }
  }

  loadCandidate() {
    this.managernameService.getCandidateStatus().subscribe((data) => {
      this.candidateList = data;
      this.refreshSecondTab = false;
    });
  }
//filtering candidate list------------


submitFilter() {
  this.tableService.filterCandidate(this.names, this.status).subscribe(
    (response: any) => {
      this.filteredData = response;
    },
    (error) => {
      console.error(error);
    }
  );
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

  // getCandidatename()

  // {

  //   this.tableService.getExistingCandidate().subscribe(names =>{

  //     this.candidateNames=names;

  //     console.log(this.candidateNames);

  //   })

  // }

  getCandidatename(): void {
    this.tableService.getExistingCandidate().subscribe((data) => {
      // Use the map operator to extract the "name" property from each object

      this.candidateNames = data.map(
        (candidate: { name: any }) => candidate.name
      );

      console.log(this.candidateNames);
    });
  }

  //Mail dialog

  //displayEmailDialog: boolean = false;

  displayEmailDialog = false;

  candidateName!: string;

  candidateEmail!: string;

  candidatePhone!: number;

  // Object to store form data

  openEmailDialog(Managername: string, fileName: string) {
    this.displayEmailDialog = true;

    console.log('Openemail');

    this.email_Managername = Managername;

    console.log('emanager', this.email_Managername);

    this.email_Filename = fileName;

    console.log('efile', this.email_Filename);

    this.email_Status = 'Completed';

    console.log('ests', this.email_Status);

    this.tableService

      .getdataby_FileName(Managername, fileName)

      .subscribe((data) => {

        console.log('View Data', data);

        this.questions = data[0].questions;
  })
}

  cancelEmailPopup() {
    this.displayEmailDialog = false;

    // Reset the form data

    this.selectedCandidates = '';
  }

  storeCandidate() {
    this.tableService
      .postCandidateDetails(
        this.candidateName,

        this.candidateEmail,

        this.candidatePhone,

        this.email_Managername,

        this.email_Status,

        this.email_Filename,

        this.questions
      )
      .subscribe((response) => {
        console.log('stored', response);
      });
  }

  sendEmail() {
    this.displayEmailDialog = false;

    // Reset the form data

    // this.formData = {};
  }
//refreshingtab

  refreshTab() {
    // Set the flag to true to trigger a refresh of the second tab
    this.refreshSecondTab = true;
  
    // Trigger change detection
    this.cdr.detectChanges();
  }
  



  //candidate filter

 
  // Function to show the filter popup
  showFilterPopup() {
    this.filterPopupVisible = true;
  }

  // Function to hide the filter popup
  hideFilterPopup() {
    this.filterPopupVisible = false;
  }

  // Function to reset filters
  resetFilters() {
    this.filterManager = '';
    //this.filterStatus = [];
  }

  // Function to apply filters
  applyFilters() {
    // Filter the candidateList based on filterManager and filterStatus
    // Update the displayed data accordingly
    // Then, hide the filter popup
    this.filterPopupVisible = false;
  }

}


interface Column {
  field: string;

  header: string;
}

// interface ManagerFilter {

//   Managername: string;

//   Skill: string[];

// }

// interface SkillFilter {

//   Skill: string[];

// }

interface FilterSkill {
  _id: number;

  skill: string;

  subskills: string[];

  __v: number;
}
