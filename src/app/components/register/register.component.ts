import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Firestore, collection } from '@angular/fire/firestore';
import { addDoc } from 'firebase/firestore';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  register!: FormGroup;
  userType: string = '';
  type: string = '';

  constructor(
    private route: Router, 
    private formBuilder: FormBuilder, 
    private firestore:Firestore
  ){}

  ngOnInit() {
    this.register = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onUserTypeChange(){
    this.type = this.userType.trim();
  }

  async onSubmit() {
    if (this.register.valid) {
      const formData = this.register.value;
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password
      };
      if(this.type == 'company'){
        const data = collection(this.firestore, 'companies');
        await addDoc(data, userData);
      }
      else if(this.type == 'jobseeker'){
        const data = collection(this.firestore, 'user');
        await addDoc(data, userData);
      }
      this.register.reset();
      this.userType = '';
      this.route.navigate(['/login']);
    }
  }
}
