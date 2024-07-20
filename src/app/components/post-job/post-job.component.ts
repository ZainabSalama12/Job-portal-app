import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { JobService } from '../../services/job.service';
import { Job } from '../../interfaces/job';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-post-job',
  templateUrl: './post-job.component.html',
  styleUrl: './post-job.component.css'
})
export class PostJobComponent {
  
  jobForm!: FormGroup;
  qualificationsText:string='';
  responsabilitiesText:string='';
  companyID: string = '';

  constructor(private jobService: JobService,private firestore:Firestore, private route: ActivatedRoute, private router: Router){
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

  async ngOnInit(){
    this.route.params.subscribe(params => {
      this.companyID = params['id'];
    })
  }

  onSubmit() {

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
    this.jobService.addJob(jobData,this.companyID);
    window.alert('Job added successfully!');
    this.jobForm.reset(); 
    this.router.navigate(['/company-job-listing', this.companyID])
  }
}
