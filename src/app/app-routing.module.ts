import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { Dash1Component } from './modules/dash1/dash1.component';

import { SchedulepageComponent } from './modules/schedulepage/schedulepage.component';

import { QuestiondisplayComponent } from './modules/questiondisplay/questiondisplay.component';

import { EditComponent } from './modules/edit/edit.component';

import { LoginComponent } from './modules/login/login.component';

import { SignupComponent } from './modules/signup/signup.component';

import { ReviewerComponent } from './modules/reviewer/reviewer.component';
import { CandidateAssessmentComponent } from './modules/candidate-assessment/candidate-assessment.component';
import { AssessmentDisplayComponent } from './modules/assessment-display/assessment-display.component';
import { QuestiondbComponent } from './modules/questiondb/questiondb.component';
import { authGuard } from './Guard/auth.guard';
import { ProfileDialogComponent } from './profile-dialog/profile-dialog.component';
// import { AuthClassGuard } from './Guard/auth-class.guard';

import { ForgotpasswordComponent } from './modules/forgotpassword/forgotpassword.component';
import { loginGuard } from './Guard/login.guard';
import { TabView } from 'primeng/tabview';

// import { NgModule } from '@angular/core';
import { BackButtonDisableModule } from 'angular-disable-browser-back-button';
import { isadminguard } from './Guard/auth-class.guard';
import { isuserguard } from './Guard/user-class.guard';
import { SidenavbarComponent } from './modules/sidenavbar/sidenavbar.component';
import { ManagernameService } from './services/managername.service';
import { AssessmentTableComponent } from './modules/assessment-table/assessment-table.component';
import { CandidateTableComponent } from './candidate-table/candidate-table.component';
import { NewScheduleComponent } from './modules/new-schedule/new-schedule.component';

const routes: Routes = [
  { path: 'create', component: Dash1Component },

  // { path: 'dashboard', component: SchedulepageComponent },

  {
    path: 'dashboard',
    component: SchedulepageComponent,
  },
  { path: 'new-schedule', component: NewScheduleComponent },

  { path: 'questiondisplay', component: QuestiondisplayComponent },

  { path: 'edit', component: EditComponent },

  { path: 'login', component: LoginComponent },

  { path: 'signup', component: SignupComponent },

  { path: 'reviewer', component: ReviewerComponent },

  { path: 'candidatehome', component: CandidateAssessmentComponent },

  { path: 'sidebar', component: SidenavbarComponent },

  // { path: 'dashboard', component: SchedulepageComponent },

  { path: 'assessment-display', component: AssessmentDisplayComponent },

  { path: 'forgotpassword', component: ForgotpasswordComponent },

  { path: '', redirectTo: '/login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },

  { path: 'AssessmentDisplay', component: AssessmentTableComponent },

  { path: 'questiondb', component: QuestiondbComponent },

  { path: 'profile', component: ProfileDialogComponent },
  { path: 'candidatetable', component: CandidateTableComponent },

  // { path: '**', component: LoginComponent }

  { path: '**', redirectTo: '/login' },

  // { path: '**', redirectTo:'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule],
})
export class AppRoutingModule {}
