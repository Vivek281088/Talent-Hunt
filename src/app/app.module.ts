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
import { ForgotpasswordComponent } from './modules/forgotpassword/forgotpassword.component';
import { MessageService } from 'primeng/api';
import { QuestiondbComponent } from './questiondb/questiondb.component';
import { ProfileDialogComponent } from './profile-dialog/profile-dialog.component';



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
    ForgotpasswordComponent,
    QuestiondbComponent,
    ProfileDialogComponent,
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
    ToastrModule.forRoot()
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
