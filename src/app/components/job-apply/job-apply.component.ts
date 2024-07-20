import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Firestore, collection } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { addDoc } from 'firebase/firestore';
import { JobService } from '../../services/job.service';

@Component({
  selector: 'app-job-apply',
  templateUrl: './job-apply.component.html',
  styleUrl: './job-apply.component.css'
})
export class JobApplyComponent {

  jobForm!: FormGroup;
  url: string = '';
  user_id: string = '';
  companyId: string = '';

  constructor(
    private route: Router, 
    private formBuilder: FormBuilder, 
    private jobService: JobService,
    private firestore:Firestore,
    private router: ActivatedRoute
  ){}

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.user_id = params['id'];
      this.companyId = params['cn'];
    })
    this.jobForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      cv: ['', Validators.required]
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.url = URL.createObjectURL(file);
    }
  }

  async onSubmit() {
    if (this.jobForm.valid) {
      const formData = this.jobForm.value;
      const applicationData = {
        user_id: this.user_id,
        company_id: this.companyId,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        cv: formData.cv
      };
      const data = collection(this.firestore, 'applications');
      await addDoc(data, applicationData);
      this.jobForm.reset();
      window.alert('Application Saved Successfully');
      this.route.navigate(['/job-listing',this.user_id])
    }
  }
  
}
