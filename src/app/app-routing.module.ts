import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './modules/login/login.component';

import { SignupComponent } from './modules/signup/signup.component';

import { ResetpasswordComponent } from './modules/resetpassword/resetpassword.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { MFAComponent } from './modules/mfa/mfa.component';
import { Enable2faComponent } from './modules/enable2fa/enable2fa.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'resetpassword', component: ResetpasswordComponent },
  { path: 'errorpage', component: ErrorPageComponent },
  { path: 'verifymfa', component: MFAComponent },
  {path: 'enablemfa', component: Enable2faComponent},
  {
    path: 'mtalent',
    loadChildren: () =>
      import('./modules/body/component-routing.module').then(
        (m) => m.ComponentRoutingModule
      ),
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule],
})
export class AppRoutingModule {}
