import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Dash1Component } from './modules/dash1/dash1.component';
import { SchedulepageComponent } from './modules/schedulepage/schedulepage.component';

const routes: Routes = [
  { path: 'create', component: Dash1Component },
  { path: 'dashboard', component: SchedulepageComponent },
  { path: '**', component: SchedulepageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
