import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DesignationComponent } from './designation/designation.component';
import { InternDashboardComponent } from './intern-dashboard/intern-dashboard.component';
import { LeavesComponent } from './leaves/leaves.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { StatusComponent } from './status/status.component';
import { WorkingHoursComponent } from './working-hours/working-hours.component';

const routes: Routes = [
  {path:'', redirectTo:'login',pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {path:'dashboard', component:InternDashboardComponent},
  {path:'dashboard/designation', component:DesignationComponent},
  {path:'dashboard/leaves', component:LeavesComponent},
  {path:'dashboard/status', component:StatusComponent},
  {path:'dashboard/WorkingHours', component:WorkingHoursComponent},
  {path:'signup', component: SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
