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

import { loginGuard } from './Guard/login.guard';
import { TabView } from 'primeng/tabview';

// import { NgModule } from '@angular/core';
import { BackButtonDisableModule } from 'angular-disable-browser-back-button';
import { isadminguard } from './Guard/auth-class.guard';
import { isuserguard } from './Guard/user-class.guard';
import { SidenavbarComponent } from './modules/sidenavbar/sidenavbar.component';
import { ManagernameService } from './services/managername.service';
import { AssessmentTableComponent } from './modules/assessment-table/assessment-table.component';
import { CandidatequestionComponent } from './modules/candidatequestion/candidatequestion.component';

import { NewScheduleComponent } from './modules/new-schedule/new-schedule.component';
import { ManageManagersComponent } from './modules/manage-managers/manage-managers.component';
import { ManageCandidatesComponent } from './modules/manage-candidates/manage-candidates.component';
import { ManageSkillsComponent } from './modules/manage-skills/manage-skills.component';
import { ManagerProfileComponent } from './modules/manager-profile/manager-profile.component';
import { CandidateProfileComponent } from './modules/candidate-profile/candidate-profile.component';
import { ResetpasswordComponent } from './modules/resetpassword/resetpassword.component';
import { THDashboardComponent } from './modules/th-dashboard/th-dashboard.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { BodyComponent } from './modules/body/component/body.component';
import { MFAComponent } from './modules/mfa/mfa.component';
import { Enable2faComponent } from './modules/enable2fa/enable2fa.component';
const routes :Routes =[
{ path: 'login', component: LoginComponent },
{ path: 'signup', component: SignupComponent },
{ path: 'resetpassword', component: ResetpasswordComponent },
{path:'errorpage' , component : ErrorPageComponent},
{path:'verifymfa',component:MFAComponent},
{
  path:'mtalent',loadChildren:()=>import('./modules/body/component-routing.module').then((m)=>m.ComponentRoutingModule),
},
{ path: '', redirectTo: '/login', pathMatch: 'full' },
{ path: '**', redirectTo: '/login', pathMatch: 'full' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule],
})
export class AppRoutingModule {}
