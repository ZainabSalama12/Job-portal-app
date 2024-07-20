import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { doc, getDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  Id: string = '';

  constructor(private firestore:Firestore) { }

  async getUserById(userId: string, type: string){  
    this.Id = userId;
    const docRef = doc(this.firestore, type, userId);
    const docSnap = await getDoc(docRef);   
    return  docSnap.data();
  }
}
