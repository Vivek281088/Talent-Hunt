import { Component,OnInit } from '@angular/core';
import { TableService } from 'src/app/services/table.service';
import { ManagernameService } from 'src/app/services/managername.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-schedulepage',
  templateUrl: './schedulepage.component.html',
  styleUrls: ['./schedulepage.component.scss']
})

export class SchedulepageComponent implements OnInit {
  tables: any[] | undefined;

  cols!: Column[];

  selectedManager: any;
  
  managerOption : any[] = []
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
    private router : Router
    ) {}

  ngOnInit() {
    this.loadManagerNames();
    this.cols = [
      { field: 'manager', header: 'Manager' },
      { field: 'file name', header: 'File name' },
      { field: 'actions', header: 'Actions' }
  ];

  }

  loadManagerNames() {
    this.managernameService.getManagerNames().subscribe(data => {
      this.managerOption = data;
    });

  }
//   managerOption1() {

//     this.managernameService.getManagerNames().subscribe(
//       data => {

//       this.managerOption = data;

//     },
//     (error) =>{
//       console.error('Error: ', error);
//     }

 

//     );
// }


  tableData = [
    {manager: "", fileName: ""},
    // {manager: "", fileName: "alamelu_aws_java_2.json"}
    // {manager: "", fileName: "alamelu_aws_java_3.json"}
  ];



  dropRes !: any;
dropFunction(){
  console.log("Drop down selected");
  this.tableService.postManagerList(this.selectedManager).subscribe(data=>{
    console.log(data);
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
