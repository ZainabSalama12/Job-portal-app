import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { JobService } from './services/job.service';
import { CommonModule } from '@angular/common';
import { JobListingComponent } from './components/job-listing/job-listing.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { JobDetailsComponent } from './components/job-details/job-details.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { JobApplyComponent } from './components/job-apply/job-apply.component';
import { AngularFireModule } from '@angular/fire/compat';
import { PostJobComponent } from './components/post-job/post-job.component';
import { CompanyJobListingComponent } from './components/company-job-listing/company-job-listing.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { AuthenticationService } from './services/authentication.service';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { UserService } from './services/user.service';
import { SavedJobsComponent } from './components/saved-jobs/saved-jobs.component';
import { CompanyJobDetailsComponent } from './components/company-job-details/company-job-details.component';
import { ViewApplicationsComponent } from './components/view-applications/view-applications.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { CompanyProfileComponent } from './components/company-profile/company-profile.component';


const firebaseConfig = {
  apiKey: "AIzaSyAjUAoDBdcPk1zrl5kr_8Hko_3N2Oa80i8",
  authDomain: "job-portal-application-d6dfe.firebaseapp.com",
  projectId: "job-portal-application-d6dfe",
  storageBucket: "job-portal-application-d6dfe.appspot.com",
  messagingSenderId: "671898034962",
  appId: "1:671898034962:web:b7738d2b2ec9001e5089cb"
};

@NgModule({
  declarations: [
    AppComponent,
    JobListingComponent,
    JobDetailsComponent,
    JobApplyComponent,
    PostJobComponent,
    CompanyJobListingComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    SavedJobsComponent,
    CompanyJobDetailsComponent,
    ViewApplicationsComponent,
    UserProfileComponent,
    CompanyProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    RouterOutlet, 
    FormsModule,
    CommonModule,
    AngularFireModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    //ngularFireModule.initializeApp(firebaseConfig),
    provideFirestore(() => getFirestore())
  ],
  providers: [
    provideClientHydration(),
    JobService,
    AuthenticationService,
    UserService,
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
