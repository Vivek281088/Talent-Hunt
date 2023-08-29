import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Dash1Component } from './modules/dash1/dash1.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { PrimeModule } from './prime.module';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    Dash1Component
        
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PrimeModule,
    FormsModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule
],
schemas: [NO_ERRORS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
