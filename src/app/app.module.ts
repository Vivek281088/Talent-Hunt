import { L1screenComponent } from './l1screen/l1screen.component';
import {
  ErrorHandler,
  NO_ERRORS_SCHEMA,
  NgModule,
  isDevMode,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Dash1Component } from './modules/dash1/dash1.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PrimeModule } from './prime.module';
import { SharedModule } from './shared/shared.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
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
import { DatePipe, DecimalPipe } from '@angular/common';
import { SidenavbarComponent } from './modules/sidenavbar/sidenavbar.component';
import { AssessmentTableComponent } from './modules/assessment-table/assessment-table.component';
import { PcrDetailsComponent } from './modules/pcr-details/pcr-details.component';
import { CandidatequestionComponent } from './modules/candidatequestion/candidatequestion.component';
import { BodyComponent } from './modules/body/component/body.component';
import { NewScheduleComponent } from './modules/new-schedule/new-schedule.component';
import { ManageManagersComponent } from './modules/manage-managers/manage-managers.component';
import { ManageCandidatesComponent } from './modules/manage-candidates/manage-candidates.component';
import { ManageSkillsComponent } from './modules/manage-skills/manage-skills.component';
import { CandidateProfileComponent } from './modules/candidate-profile/candidate-profile.component';
import { ManagerProfileComponent } from './modules/manager-profile/manager-profile.component';
import { ResetpasswordComponent } from './modules/resetpassword/resetpassword.component';
import { ThreeDigitDirective } from './modules/schedulepage/directives/three-digit.directive';
import { NameInputDirective } from './modules/manage-managers/name-input.directive';
import { AllowDigitsDirective } from './modules/manage-managers/allow-digits.directive';
import { THDashboardComponent } from './modules/th-dashboard/th-dashboard.component';
import { CustomHttpException } from './error-page/customexception';
import { GlobalErrorInterceptor } from './Interceptors/global-error.interceptor';
import { QuestionPreviewComponent } from './modules/question-preview/question-preview.component';
import { zip } from 'rxjs';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { MFAComponent } from './modules/mfa/mfa.component';
import { Enable2faComponent } from './modules/enable2fa/enable2fa.component';
import { PcrResourceMappingComponent } from './modules/pcr-resource-mapping/pcr-resource-mapping.component';
import { StoreDevtoolsModule, provideStoreDevtools } from '@ngrx/store-devtools';

import { EffectsModule, provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { ScheduleFeature } from './store/schedule/schedule.selector';
import {
  addSchedule$,
  deleteSchedule$,
  loadSchedule$,
} from './store/schedule/schedule.effects';
import {
  loadManager$,
  addManager$,
  deleteManager$,
} from './store/manage-manager/manage-manager.effects';
import { AuthkeyInterceptor } from './Interceptors/authkey.interceptor';
import {
  deleteCandidate$,
  loadCandidate$,
  updateCandidate$,
} from './store/candidate/candidate.effects';

import { CandidateFeature } from './store/candidate/candidate.selector';
import { ManagePcrComponent } from './modules/manage-pcr/manage-pcr.component';
// import { pcrFeature } from './store/pcr/pcr.selector';
import { addpcr$,  updatePcr$ } from './store/pcr/pcr.effects';
// import { addpcr$, } from './store/pcr/pcr.effects';
// import { getPcr$ } from './store/pcr/pcr.effects';




import { assessmentFeature } from './store/Assessment/assessment.selector';
import { managerFeature } from './store/manage-manager/manager-manager.selector';
import {
  loadAssessment$,
  sendAssessments$,
} from './store/Assessment/assessment.effects';
import { MapPcrCandidate$, loadMappedData$ } from './store/PCR-Mapping/pcr-mapping.effects';
import { mappingFeature, mappingPcrCandidateFeature } from './store/PCR-Mapping/pcr-mapping.selector';
import { getPcr$ } from './store/pcr/pcr.effects';
import { PCRState, pcrFeature } from './store/pcr/pcr.selector';
import { ResourceComponent } from './modules/resource/resource.component';





import { CandidateDetailsComponent } from './modules/candidate-details/candidate-details.component';
import { ResourceFeature } from './store/Resource/resource.selector';
import { getCandidates$  ,
  AddResource$ } from './store/Resource/resource.effects';

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
    THDashboardComponent,
    BodyComponent,
      NewScheduleComponent,
      ManageManagersComponent,
      ManageCandidatesComponent,
      ManageSkillsComponent,
      CandidateProfileComponent,
      ManagerProfileComponent,
      ResetpasswordComponent,
      ThreeDigitDirective,
      NameInputDirective,
      AllowDigitsDirective,
      PcrResourceMappingComponent,
      ResourceComponent,
      ManagePcrComponent,
      PcrDetailsComponent,
      CandidateDetailsComponent,
      L1screenComponent
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
    QuestionPreviewComponent,
    MFAComponent,
    Enable2faComponent,
    DecimalPipe,
    ToastrModule.forRoot(),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [
    MessageService,
    DatePipe,
    provideStore(),
    provideState(ScheduleFeature),
    provideState(assessmentFeature),
    provideState(CandidateFeature),
    provideState(managerFeature),
    provideState(mappingFeature),
    provideState(pcrFeature),
    provideState(ResourceFeature),

    provideState(mappingPcrCandidateFeature),
   // provideEffects([{loadSchedule$},{addSchedule$},{deleteSchedule$},{loadCandidate$},{updateCandidate$},{addSchedule$},{AddCandidate$},{deleteCandidate$},{getPcr$},{addpcr$}]),
    provideEffects([
      { loadSchedule$ },
      { addSchedule$ },
      { deleteSchedule$ },
      { loadCandidate$ },
      { updateCandidate$ },
      { sendAssessments$ },
      { loadAssessment$ },
      { loadManager$ },
      { addManager$ },
      { deleteCandidate$ },
      { deleteManager$ },
      {loadMappedData$},
      {getPcr$},
      {getCandidates$},
      {AddResource$},
      {MapPcrCandidate$},
      {addpcr$},
    ]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    //   provide : ErrorHandler,
    //   useClass : CustomHttpException
    // },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthkeyInterceptor,
      multi: true,
    },
    // {
    //   provide : HTTP_INTERCEPTORS,
    //   useClass : GlobalErrorInterceptor,
    //   multi : true
    // },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
