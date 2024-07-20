import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { Firestore, collection, collectionData, doc, getDoc, query, where, } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { getDocs } from 'firebase/firestore';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  login!: FormGroup;
  dataCollection:Observable<any[]> | null = null;
  userType: string = '';
  errorMessage: string = '';
  type: string = '';
  id: string = '';

  constructor(
    private route: Router, 
    private formBuilder: FormBuilder, 
    private firestore:Firestore,
    private userService: UserService
  ){}

  ngOnInit() {
    this.login = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onUserTypeChange(){
    if(this.userType.trim() == 'company'){
      this.type = 'companies';
    }
    else if(this.userType.trim() == 'jobseeker'){
      this.type = 'user';
    }
  }

  async onSubmit(){
    if(this.login.valid){
      let usersCollection = collection(this.firestore, this.type);
      let queryCondition = query(usersCollection, 
        where('email', '==', this.login.value.email),
        where('password', '==', this.login.value.password)
      );
      const querySnapshot = await getDocs(queryCondition);
      this.id = querySnapshot.docs[0].id;
      if(!querySnapshot.empty && this.type == 'user'){
        this.userService.getUserById(this.id, this.type);
        this.route.navigate(['/job-listing',this.id])
      }
      else if(!querySnapshot.empty && this.type == 'companies'){
        this.userService.getUserById(this.id, this.type);
        this.route.navigate(['/company-job-listing',this.id])
      }
      else{
        this.errorMessage = "User Doesn't Exists"
      }
    }
  }

  

}
