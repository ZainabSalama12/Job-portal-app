import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Job } from '../../interfaces/job';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from '../../services/job.service';
import { RouterModule } from '@angular/router';
import { promises } from 'dns';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.css'
})
export class JobDetailsComponent implements OnInit{

  job_id: string = '';
  user_id: string = '';
  jobDetails: any = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jobService: JobService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.job_id = params['job-id'];
      this.user_id = params['user-id'];
      this.getJobDetails(this.job_id)
    })
  }

  async getJobDetails(id: string): Promise<void>{
    this.jobDetails = await this.jobService.getJobById(id)
  }

  navigateToApplication() {
    this.router.navigate(['/application-form',this.user_id,this.jobDetails.company_id]);
  }

}
