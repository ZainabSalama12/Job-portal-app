import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from '../../services/job.service';
import { FormGroup,FormBuilder, Validators, FormControl } from '@angular/forms';
import { Job } from '../../interfaces/job';

@Component({
  selector: 'app-company-job-details',
  templateUrl: './company-job-details.component.html',
  styleUrl: './company-job-details.component.css'
})
export class CompanyJobDetailsComponent {

  jobForm!: FormGroup;
  jobIndex: number=0 ;
  jobDetails: any = null;
  jobID: string='';
  companyID:string='';
  responsibilitiesText: string = '';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jobService: JobService,
    private formBuilder: FormBuilder) {
    this.jobForm = new FormGroup({
      title: new FormControl('', Validators.required),
      companyName: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      salary: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      qualificationsText: new FormControl('', Validators.required),
      responsibilitiesText: new FormControl('', Validators.required)
    });
   }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.companyID = this.route.snapshot.params['companyId'];
      this.jobIndex = +this.route.snapshot.params['jobIndex'];
      const jobID=this.jobService.getJobCompanyById(this.companyID, this.jobIndex);
    });
  }

  updateJob(){
    
    const responsibilitiesText: string = this.jobForm.get('responsibilitiesText')?.value ?? '';
    const responsibilitiesArray: string[] = responsibilitiesText.split('\n').map(responsibility => responsibility.trim());

    const qualificationsText: string = this.jobForm.get('qualificationsText')?.value ?? '';
    const qualificationsArray: string[] = qualificationsText.split('\n').map(qualification => qualification.trim());

    const jobData:Job = {
      title: this.jobForm.get('title')?.value ?? '',
      companyName: this.jobForm.get('companyName')?.value ?? '',
      location: this.jobForm.get('location')?.value ?? '',
      salary: this.jobForm.get('salary')?.value ?? '',
      description: this.jobForm.get('description')?.value ?? '',
      qualifications: qualificationsArray??[],
      responsabilities: responsibilitiesArray ?? [],
      company_id: this.companyID,
      jobId:''
    };    
      this.jobService.updateJob(this.companyID, this.jobIndex, jobData);
      window.alert('Job updated successfully!');
      this.jobForm.reset(); 
      this.router.navigate(['/company-job-listing', this.companyID])
  }
}
