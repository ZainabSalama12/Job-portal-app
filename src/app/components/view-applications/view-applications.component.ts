import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { JobService } from '../../services/job.service';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { collection, where, query, getDocs } from 'firebase/firestore';

@Component({
  selector: 'app-view-applications',
  templateUrl: './view-applications.component.html',
  styleUrl: './view-applications.component.css'
})
export class ViewApplicationsComponent {

  applications: Observable<any[]> | null = null;
  company_id: string = '';

  constructor(
    private firestore:Firestore, 
    private route: ActivatedRoute)
  {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.company_id = params['id'];
    })
    this.viewApplications(this.company_id);
  }

  viewApplications(id: string){
    let Collection = collection(this.firestore, 'applications');
    let queryCondition = query(Collection, where('company_id', '==', id));
    this.applications = collectionData(queryCondition, { idField: 'id' })
  }
}
