import { Component,OnInit } from '@angular/core';
import { TableService } from 'src/app/services/table.service';
import { ManagernameService } from 'src/app/services/managername.service';
import { Router } from '@angular/router';
import { SkillsdropdownService } from '../services/skillsdropdown.service';


@Component({
  selector: 'app-schedulepage',
  templateUrl: './schedulepage.component.html',
  styleUrls: ['./schedulepage.component.scss']
})

export class SchedulepageComponent implements OnInit {
  tables: any[] | undefined;

  cols!: Column[];

  selectedManager: string='';
  
  managerOption: any[] = [];
  
  skillSet: any[] = [];

  selectedSkill: any[] = [];

  managerName : string='';
  skill: String[]= [];
  filteredSkill  :String[]= [];
  fskill:String[]= [];
  exdata: any[] = [];



  isCreate : boolean = true;
  isEdit : boolean = true;
  isMail : boolean = true;

  // managerOption = [
  //   {name: "Alamelu", label: "Alamelu"},
  //   {name: "Sengamalam", label: "Sengamalam"},
  //   {name: "Suresh", label: "Suresh"}
  // ];

  constructor(
    private tableService: TableService,
    private managernameService: ManagernameService,
    private skillsdropdownservice : SkillsdropdownService,
    private router : Router
    ) {}

  ngOnInit() {
    this.loadManagerNames();
    // this.tableData1();
    this.searchFunction();
    this.skillsFilter();
    this.existingData();
    this.cols = [
      { field: 'manager', header: 'Manager' },
      { field: 'file name', header: 'File name' },
      { field: 'actions', header: 'Actions' }
  ];

  }
  existingData() {
    this.tableService.getExistingTableData().subscribe(data => {
      this.exdata = data;
      
    console.log('Existing Data', this.exdata);
  })
  }
  skillsFilter() {
    this.tableService.getskillsTable().subscribe(data => {
      this.filteredSkill = data;
      
    console.log('Selected Manager:', this.filteredSkill);
  })
}
  searchFunction() {
    console.log("Drop down selected");
      this.tableService.postTableFilteredData(this.selectedManager, this.fskill).subscribe(data=>{
        
        // this.isCreate = !data.create;
        // this.isEdit = !data.edit;
        // this.isMail = !data.mail;
         
        // console.log("create",this.isCreate);
        // console.log("edit",this.isEdit);
        // console.log("mail", this.isMail)
    
        //  this.managernameService.setManagerName(this.selectedManager);
        console.log("fsm", this.selectedManager);
        console.log("fss", this.fskill);
        
      })
    }
      
// tableData1()
// {
//   this.tableService.getTableData().subscribe(data => {
//     this.tableData1 = data;
//     console.log("tdata:",this.tableData1)
//   });

// }
  loadManagerNames() {
    this.managernameService.getManagerNames().subscribe(data => {
      this.managerOption = data;
    });
  }


  getskillSet() {

   

    this.skillsdropdownservice.getskillsList().subscribe(data => {

      this.skillSet = data;

    });
  }

  tableData = [
    {manager: "", fileName: ""},
    // {manager: "", fileName: "alamelu_aws_java_2.json"}
    // {manager: "", fileName: "alamelu_aws_java_3.json"}
  ];



  dropRes !: any;

dropFunction(){
  console.log("Drop down selected");
  this.tableService.postManagerList(this.selectedManager).subscribe(data=>{
    console.log("Hi", data);
    this.isCreate = !data.create;
    this.isEdit = !data.edit;
    this.isMail = !data.mail;
     
    console.log("create",this.isCreate);
    console.log("edit",this.isEdit);
    console.log("mail", this.isMail)

     this.managernameService.setManagerName(this.selectedManager);
    console.log("manager", this.selectedManager);
   

   
  })
  }
  
  
  
addNewRow(){
  const newRow = {manager: '', fileName: ''};
this.tableData.push(newRow);
}
 
}
interface Column {
  field: string;
  header: string;
}


// searchFuntion(){
//   console.log("Drop down selected");
//   this.tableService.postTableFilteredData(this.managerName, this.skills).subscribe(data=>{
    
//     this.isCreate = !data.create;
//     this.isEdit = !data.edit;
//     this.isMail = !data.mail;
     
//     console.log("create",this.isCreate);
//     console.log("edit",this.isEdit);
//     console.log("mail", this.isMail)

//      this.managernameService.setManagerName(this.selectedManager);
//     console.log("manager", this.selectedManager);
   

   
//   })
// }

function searchFuntion() {
  throw new Error('Function not implemented.');
}

