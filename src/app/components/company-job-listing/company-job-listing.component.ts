import { Component, OnInit } from '@angular/core';
import { JobService } from '../../services/job.service';
import { Observable, map } from 'rxjs';
import { Firestore, addDoc, arrayRemove, collection ,deleteDoc,doc, getDoc, setDoc, updateDoc} from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Company } from '../../interfaces/company';
import { Job } from '../../interfaces/job';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-job-listing',
  templateUrl: './company-job-listing.component.html',
  styleUrl: './company-job-listing.component.css'
})
export class CompanyJobListingComponent implements OnInit {

  companyDetails: any =null;
  showForm: boolean = false;
  companyID: string = '';
  isPaused: boolean = false;
  constructor(private router: Router, private firestore: Firestore,private jobService: JobService, private route: ActivatedRoute) { }

  async ngOnInit(): Promise<void> {
    this.route.params.subscribe(params => {
      this.companyID = params['id'];
    })
    this.companyDetails = await this.jobService.getCompanyJobs(this.companyID);
    
  }
  async deleteJob(jobIndex: number) {
      await this.jobService.deleteJob(jobIndex, this.companyID);
      window.location.reload();
  }
  async pauseJob(jobIndex: number) {
    await this.jobService.pauseJob(jobIndex, this.companyID);
  }

  togglePause(jobIndex: number) {
    this.pauseJob(jobIndex);
    this.isPaused = true;
  }


  goToPostedJobPage() {
    this.router.navigate(['/add-job',this.companyID]);
  }

  editJob(jobIndex: number): void {
    this.router.navigate(['/company', this.companyID, 'job', jobIndex]);
  }
    
}
