import { Component } from '@angular/core';
import { agileActions } from 'src/app/store/Agile1/Agile1.action';
import { getAgile } from 'src/app/store/Agile1/Agile1.selector';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-manage-agile1',
  templateUrl: './manage-agile1.component.html',
  styleUrls: ['./manage-agile1.component.scss']
})
export class ManageAgile1Component  {
  agileData:any
  constructor(private store:Store){

  }
 ngOnInit(){
  this. getAgileData();
 }

 getAgileData() {
  this.store.dispatch(agileActions.getAgileDetails());
  this.store.select(getAgile).subscribe((data) => {
    console.log('Agile Details', data);
    this.agileData = data;
  });
}
}
