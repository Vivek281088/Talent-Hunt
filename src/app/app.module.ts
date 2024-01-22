import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Dash1Component } from './modules/dash1/dash1.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PrimeModule } from './prime.module';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { SchedulepageComponent } from './modules/schedulepage/schedulepage.component';
import { NavbarComponent } from './modules/navbar/navbar.component';
import { FooterComponent } from './modules/footer/footer.component';
import { QuestiondisplayComponent } from './modules/questiondisplay/questiondisplay.component';
import { EditComponent } from './modules/edit/edit.component';
import { LoginComponent } from './modules/login/login.component';
import { SignupComponent } from './modules/signup/signup.component';
import { CandidateAssessmentComponent } from './modules/candidate-assessment/candidate-assessment.component';
import { ReviewerComponent } from './modules/reviewer/reviewer.component';
import { AssessmentDisplayComponent } from './modules/assessment-display/assessment-display.component';
import { ToastrModule } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
import { QuestiondbComponent } from './modules/questiondb/questiondb.component';
import { ProfileDialogComponent } from './profile-dialog/profile-dialog.component';
import { DatePipe } from '@angular/common';
import { SidenavbarComponent } from './modules/sidenavbar/sidenavbar.component';
import { AssessmentTableComponent } from './modules/assessment-table/assessment-table.component';

import { CandidatequestionComponent } from './modules/candidatequestion/candidatequestion.component';

import { BodyComponent } from './modules/body/body.component';
import { NewScheduleComponent } from './modules/new-schedule/new-schedule.component';
import { ManageManagersComponent } from './modules/manage-managers/manage-managers.component';
import { ManageCandidatesComponent } from './modules/manage-candidates/manage-candidates.component';
import { ManageSkillsComponent } from './modules/manage-skills/manage-skills.component';
import { CandidateProfileComponent } from './modules/candidate-profile/candidate-profile.component';
import { ManagerProfileComponent } from './modules/manager-profile/manager-profile.component';
import { ResetpasswordComponent } from './modules/resetpassword/resetpassword.component';




@NgModule({
  declarations: [
    AppComponent,
    Dash1Component,
    SchedulepageComponent,
    NavbarComponent,
    FooterComponent,
    QuestiondisplayComponent,
    EditComponent,
    LoginComponent,
    SignupComponent,
    CandidateAssessmentComponent,
    ReviewerComponent,
    AssessmentDisplayComponent,
    QuestiondbComponent,
    ProfileDialogComponent,
    SidenavbarComponent,
    AssessmentTableComponent,
    CandidatequestionComponent,

    BodyComponent,
      NewScheduleComponent,
      ManageManagersComponent,
      ManageCandidatesComponent,
      ManageSkillsComponent,
      CandidateProfileComponent,
      ManagerProfileComponent,
      ResetpasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PrimeModule,
    FormsModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    
    ToastrModule.forRoot(),
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [MessageService,DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
