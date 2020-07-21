import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PreworkoutpageComponent } from './preworkoutpage/preworkoutpage.component';
import {CreateworkoutpageComponent} from './createworkoutpage/createworkoutpage.component';
import {WorkoutComponent} from './component/workout/workout.component';
import {HomepageComponent} from './homepage/homepage.component';
import {HomeComponent} from './component/home/home.component';
import {RegisterComponent} from './component/register/register.component';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';

import {AuthGuard} from './_helpers/auth.guard';

const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent, canActivate: [!AuthGuard]},
  {path: 'pre-workout',component: PreworkoutpageComponent, canActivate: [AuthGuard]},
  {path: 'create-workout',component: CreateworkoutpageComponent, canActivate: [AuthGuard]},
  {path: 'create-workout/:id',component: CreateworkoutpageComponent, canActivate: [AuthGuard]},
  {path: 'workout',component: WorkoutComponent, canActivate: [AuthGuard]},
  {path: '', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
