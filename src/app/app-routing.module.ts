import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestiondisplayComponent } from './modules/questiondisplay/questiondisplay.component';
import { Dash1Component } from './modules/dash1/dash1.component';

const routes: Routes = [
  { path: 'questiondisplay', component: QuestiondisplayComponent },
  { path: 'dash1', component: Dash1Component }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
