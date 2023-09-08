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

  filterSkills!: SkillFilter;

  filterManager !: ManagerFilter;
  
  filteredData: any[] = [];



  isCreate : boolean = true;
  isEdit : boolean = true;
  isMail : boolean = true;
 
  Tdata1: any[] = [];

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
    this.existingData();
    this.getskillSet();
    
    this.cols = [
      { field: 'manager', header: 'Manager' },
      { field: 'file name', header: 'File name' },
      { field: 'actions', header: 'Actions' }
  ];

  }
// tableData1()
// {
//   this.tableService.getTableData().subscribe(data => {
//     this.tableData1 = data;
//     console.log("tdata:",this.tableData1)
//   });

// }
  
  existingData() {
    this.tableService.getExistingData().subscribe(data => {
    this.Tdata1 = data;
    console.log("ExistingData:",this.Tdata1)
  }); 
  }
  
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

    this.skillsdropdownservice.getskillsList().subscribe(data => {
      this.skillSet = data;
  
      // console.log(this.skillSet);

  
    });
    
   

   
  })
  }
  

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

  onSearchClick() {
    this.skillsdropdownservice
      .searchManager(this.filterManager?.Managername, this.filterSkills?.Skill)
      .subscribe((data) => {
        console.log('Api response', data)
        this.filteredData = data;
        console.log('Filterd Data', this.filteredData);
        console.log('Filter Manager:', this.filterManager);
        console.log('Filter Skills:', this.filterSkills);
        
        
      });
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
interface ManagerFilter {
  Managername: string,
  Skill : string[]
}
interface SkillFilter{
  Skill : string[]
}