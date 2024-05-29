import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodyComponent } from './component/body.component';
import { THDashboardComponent } from '../th-dashboard/th-dashboard.component';
import { CandidatequestionComponent } from '../candidatequestion/candidatequestion.component';
import { Dash1Component } from '../dash1/dash1.component';
import { SchedulepageComponent } from '../schedulepage/schedulepage.component';
import { NewScheduleComponent } from '../new-schedule/new-schedule.component';
import { QuestiondisplayComponent } from '../questiondisplay/questiondisplay.component';
import { EditComponent } from '../edit/edit.component';
import { ReviewerComponent } from '../reviewer/reviewer.component';
import { CandidateAssessmentComponent } from '../candidate-assessment/candidate-assessment.component';
import { AssessmentDisplayComponent } from '../assessment-display/assessment-display.component';
import { AssessmentTableComponent } from '../assessment-table/assessment-table.component';
import { QuestiondbComponent } from '../questiondb/questiondb.component';
import { ProfileDialogComponent } from 'src/app/profile-dialog/profile-dialog.component';
import { ManageManagersComponent } from '../manage-managers/manage-managers.component';
import { ManageCandidatesComponent } from '../manage-candidates/manage-candidates.component';
import { ManageSkillsComponent } from '../manage-skills/manage-skills.component';
import { ManagerProfileComponent } from '../manager-profile/manager-profile.component';
import { CandidateProfileComponent } from '../candidate-profile/candidate-profile.component';
import { ManagePCRComponent } from '../manage-pcr/manage-pcr.component';

const routes:Routes=[{path:'',component:BodyComponent,
  children:[
    {path :'' , component:THDashboardComponent},
    { path: 'candidatequestion', component: CandidatequestionComponent },
    { path: 'create', component: Dash1Component },
    {path: 'dashboard',component: SchedulepageComponent},
    { path: 'new-schedule', component: NewScheduleComponent },
    { path: 'questiondisplay', component: QuestiondisplayComponent },
    { path: 'edit', component: EditComponent },
    { path: 'reviewer', component: ReviewerComponent },
    { path: 'candidatehome', component: CandidateAssessmentComponent },
    { path: 'assessment-display', component: AssessmentDisplayComponent },
    { path: 'AssessmentDisplay', component: AssessmentTableComponent },
    { path: 'questiondb', component: QuestiondbComponent },
    { path: 'profile', component: ProfileDialogComponent },
    { path: 'manage-managers', component: ManageManagersComponent },
    { path: 'manage-candidates', component: ManageCandidatesComponent },
    { path: 'manage-skills', component: ManageSkillsComponent },
    { path: 'managerProfile', component: ManagerProfileComponent },
    { path: 'candidateProfile', component: CandidateProfileComponent },
    { path: 'thdashboard', component: THDashboardComponent },
    {path:'manage-Pcr',component:ManagePCRComponent}

  ]
}]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentRoutingModule { 
}
