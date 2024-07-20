import { Component } from '@angular/core';
import { JobService } from '../../services/job.service';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, switchMap } from 'rxjs';
import { collection, where, query, getDocs } from 'firebase/firestore';

@Component({
  selector: 'app-saved-jobs',
  templateUrl: './saved-jobs.component.html',
  styleUrl: './saved-jobs.component.css'
})
export class SavedJobsComponent {

  userSaved: Observable<any[]> | null = null;
  userId: string = '';

  constructor(
    private service:JobService, 
    private firestore:Firestore, 
    private userService: UserService, 
    private route: ActivatedRoute)
  {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = params['id'];
      this.getUserSaved(this.userId);
    })
  }

  async getUserSaved(id: string){
    let Collection = collection(this.firestore, 'savedJobs');
    let queryCondition = query(Collection, where('user_id', '==', id));
    this.userSaved = collectionData(queryCondition, { idField: 'id' })
  }

}
