import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobListingComponent } from './components/job-listing/job-listing.component';
import { JobDetailsComponent } from './components/job-details/job-details.component';
import { JobApplyComponent } from './components/job-apply/job-apply.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CompanyJobListingComponent } from './components/company-job-listing/company-job-listing.component';
import { HomeComponent } from './components/home/home.component';
import { SavedJobsComponent } from './components/saved-jobs/saved-jobs.component';
import { PostJobComponent } from './components/post-job/post-job.component';
import { CompanyJobDetailsComponent } from './components/company-job-details/company-job-details.component';
import { ViewApplicationsComponent } from './components/view-applications/view-applications.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { CompanyProfileComponent } from './components/company-profile/company-profile.component';


const routes: Routes = [
  { path: 'job/:job-id/:user-id', component: JobDetailsComponent },
  { path: 'application-form/:id/:cn', component: JobApplyComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent },
  { path: 'job-listing/:id', component: JobListingComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'company-job-listing/:id', component: CompanyJobListingComponent},
  { path: 'saved-jobs/:id', component: SavedJobsComponent },
  { path: 'add-job/:id', component: PostJobComponent},
  { path: 'company/:companyId/job/:jobIndex', component: CompanyJobDetailsComponent},
  { path: 'view-apps/:id', component: ViewApplicationsComponent},
  { path: 'user-profile/:id', component: UserProfileComponent},
  { path: 'company-profile/:id', component: CompanyProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
