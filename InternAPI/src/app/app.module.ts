import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InternDashboardComponent } from './intern-dashboard/intern-dashboard.component';
import { ApiService } from './shared/api.service';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { DesignationComponent } from './designation/designation.component';
import { LeavesComponent } from './leaves/leaves.component';
import { WorkingHoursComponent } from './working-hours/working-hours.component';
import { StatusComponent } from './status/status.component';

@NgModule({
  declarations: [
    AppComponent,
    InternDashboardComponent,
    SignupComponent,
    LoginComponent,
    DesignationComponent,
    LeavesComponent,
    WorkingHoursComponent,
    StatusComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
