import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobService } from '../../services/job.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {

  id: string = '';
  userDetails: any = null;
  file: any = null;
  url: string = '';

  constructor(
    private route: ActivatedRoute,
    private jobService: JobService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.getUserDetails(this.id);
    });
  }

  async getUserDetails(id: string): Promise<void> {
    this.userDetails = await this.jobService.getUserById(id);
  }

  async onSubmit() {
    try {
      await this.jobService.updateUser(this.id, this.userDetails);
      console.log('User updated:', this.userDetails);
      window.alert("Updated Succeesfully")
    } catch (error) {
      console.error('Error updating user:', error);
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.url = URL.createObjectURL(file);
    }
  }
}
