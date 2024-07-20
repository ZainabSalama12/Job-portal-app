import { Component, OnInit } from '@angular/core';
import { JobService } from '../../services/job.service';
import { Observable } from 'rxjs';
import { Firestore, query, where, addDoc, collection, collectionData } from '@angular/fire/firestore';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-job-listing',
  templateUrl: './job-listing.component.html',
  styleUrl: './job-listing.component.css'
})
export class JobListingComponent implements OnInit{

  jobs:Observable<any[]>;
  search_title: string = '';
  search_results: Observable<any[]> | null = null;
  jobTypeFilter: string = '';
  minSalary: string = '';
  maxSalary: string = '';
  location: string = '';
  user: any = null;
  Id: string = '';

  constructor(private service:JobService, private firestore:Firestore, private userService: UserService, private route: ActivatedRoute){
    this.jobs = this.service.getJobs();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.Id = params['id'];
      this.getUserDetails(this.Id)
    })
  }

  async getUserDetails(id: string): Promise<void>{
    this.user = await this.userService.getUserById(id, 'user');
  }

  search(){
    if (this.search_title.trim() != ''){
      this.search_results = this.service.searchJobsByTitle(this.search_title.trim());
    }
  }

  async saveJob(id: any, title: any, com_name: any){
    const data = collection(this.firestore, 'savedJobs');
    const dataToSave = {
      job_id: id,
      user_id: this.Id,
      company_name: com_name,
      job_title: title
    };
    await addDoc(data, dataToSave);
    window.alert('Job Saved Successfully!');
  }

  filterByJobType(){
    if (this.jobTypeFilter.trim() != ''){
      let jobsCollection = collection(this.firestore, 'jobs');
      let queryCondition = query(jobsCollection, where('jobType', '==', this.jobTypeFilter.trim()));
      this.jobs = collectionData(queryCondition, { idField: 'id' });
    }
  }

  filterByLocation(){
    if (this.location.trim() != ''){
      let jobsCollection = collection(this.firestore, 'jobs');
      let queryCondition = query(jobsCollection, where('location', '==', this.location.trim()));
      this.jobs = collectionData(queryCondition, { idField: 'id' });
    }
  }

  filterBySalary() {
    // Parse input values as numbers
    const minSalary = parseInt(this.minSalary, 10);
    const maxSalary = parseInt(this.maxSalary, 10);
  
    // Check if both minimum and maximum salary are valid numbers
    if (!isNaN(minSalary) && !isNaN(maxSalary)) {
      let jobsCollection = collection(this.firestore, 'jobs');
      let queryCondition = query(jobsCollection, 
        where('salary', '>=', minSalary),
        where('salary', '<=', maxSalary)
      );
      this.jobs = collectionData(queryCondition, { idField: 'id' });
      this.minSalary = '';
      this.maxSalary = '';
    }else{
      this.jobs=this.service.getJobs();
    }
    this.minSalary = '';
    this.maxSalary = '';
  }
}
