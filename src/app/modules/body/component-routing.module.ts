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
import { L1screenComponent } from 'src/app/l1screen/l1screen.component';
import{ ResourceComponent } from '../resource/resource.component';
import { ManagePcrComponent } from '../manage-pcr/manage-pcr.component';
import { PcrDetailsComponent } from '../pcr-details/pcr-details.component';
import { PcrResourceMappingComponent } from '../pcr-resource-mapping/pcr-resource-mapping.component';
import { CandidateDetailsComponent } from '../candidate-details/candidate-details.component';
import { MainscreenComponent } from '../mainscreen/mainscreen.component';
import { OnboardComponent } from '../onboard/onboard.component';

const routes:Routes=[{path:'',component:BodyComponent,
  children:[
    {path :'' , component:THDashboardComponent},

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
    { path:'l1Screen',component:L1screenComponent},
    { path: 'pcr-mapping', component: PcrResourceMappingComponent },
    {path : 'pcrdetails' , component : PcrDetailsComponent},
    {path: 'resource', component:ResourceComponent},
    {path:'manage-pcr',component:ManagePcrComponent},
    { path: 'candidatedetails', component: CandidateDetailsComponent },
    {path:'mainscreen',component:MainscreenComponent},
    {path:'onboard',component:OnboardComponent},

  ]
}]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentRoutingModule {
}
