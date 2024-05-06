import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent  implements OnInit{
   @Input() displayCommonContent!: boolean;

   @Input() FinalizedQuestions!: any;
   @Output() hideData: EventEmitter<boolean> = new EventEmitter<boolean>();
 ngOnInit(){
  console.log("received respnse",this.FinalizedQuestions)
 }
   getSelectedOptions(selected_Option: any, option: any) {
    if (selected_Option.includes(option)) {
      return 'correctAnswer';
    } else {
      return 'wrongAnswer';
    }
  }
  getLabel(index: number): string {
    return String.fromCharCode(65 + index);
  }
  closeSidebar(){
    this.hideData.emit(true);
  }
}
