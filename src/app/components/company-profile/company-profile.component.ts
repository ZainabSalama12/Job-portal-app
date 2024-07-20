import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobService } from '../../services/job.service';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrl: './company-profile.component.css'
})
export class CompanyProfileComponent {

  id: string = '';
  companyDetails: any = null;
  image: any = null;
  url: string = '';

  constructor(
    private route: ActivatedRoute,
    private jobService: JobService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.getCompanyDetails(this.id);
    });
  }

  async getCompanyDetails(id: string): Promise<void> {
    this.companyDetails = await this.jobService.getCompanyById(id);
  }

  async onSubmit() {
    try {
      if (this.image) {
        this.companyDetails.logopath = await this.url;
      }
      // Update company details in the database
      await this.jobService.updateCompany(this.id, this.companyDetails);
      console.log('Company updated:', this.companyDetails);
    } catch (error) {
      console.error('Error updating company:', error);
    }
  }
  

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.url = URL.createObjectURL(file);
    }
  }


}
