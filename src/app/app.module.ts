import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {JwtInterceptor} from './_helpers/jwt.inteceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { PreworkoutpageComponent } from './preworkoutpage/preworkoutpage.component';
import { CreateworkoutpageComponent } from './createworkoutpage/createworkoutpage.component';
import { WorkoutComponent } from './component/workout/workout.component';
import { RegisterComponent } from './component/register/register.component';

import { HomepageComponent } from './homepage/homepage.component';
import { HomeComponent } from './component/home/home.component';
import { CommonModule } from '@angular/common';
import { PreworkoutComponent } from './component/preworkout/preworkout.component';

import {DragulaModule} from 'ng2-dragula';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    PreworkoutpageComponent,
    CreateworkoutpageComponent,
    WorkoutComponent,
    RegisterComponent,
    HomepageComponent,
    HomeComponent,
    PreworkoutComponent,
    //DragulaModule
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    DragulaModule.forRoot()
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
