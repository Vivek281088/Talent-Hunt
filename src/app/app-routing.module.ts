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
import {authGuard} from './Guard/auth.guard'
import { ForgotpasswordComponent } from './modules/forgotpassword/forgotpassword.component';

 

const routes: Routes = [
  { path: 'create', component: Dash1Component},

  // { path: 'dashboard', component: SchedulepageComponent },
  { path: 'dashboard', component: SchedulepageComponent},

  { path: 'questiondisplay', component: QuestiondisplayComponent},

  { path: 'edit', component: EditComponent },

  { path: 'login', component: LoginComponent},

  { path: 'signup', component: SignupComponent},

  { path: 'reviewer', component: ReviewerComponent},
  { path: 'candidateassessment', component:  CandidateAssessmentComponent },
  // { path: 'dashboard', component: SchedulepageComponent },
  { path: 'assessment-display', component: AssessmentDisplayComponent}, 
  {path:'forgotpassword',component:ForgotpasswordComponent},

  { path: '**', component: LoginComponent },


];

 

@NgModule({

  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule],

})

export class AppRoutingModule {}

 