import { Injectable } from '@angular/core';
import { getFirestore, Firestore, collection, collectionData, doc, getDoc, query, where, addDoc, updateDoc, setDoc, arrayRemove, deleteDoc } from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';
import { Job } from '../interfaces/job';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private fs:Firestore) { }

  getJobs(){
    let jobs = collection(this.fs,'jobs');
    return collectionData(jobs,{idField:'id'});
  }

  async getJobById(jobId: string){  
    const docRef = doc(this.fs, 'jobs', jobId);
    const docSnap = await getDoc(docRef);   
    return docSnap.data();
  }

  searchJobsByTitle(keyword: string): Observable<any[]> {
    let jobsCollection = collection(this.fs, 'jobs');
    let queryCondition = query(jobsCollection, where('title', '==', keyword));
    return collectionData(queryCondition, { idField: 'id' });
  }
  
  async getCompanyJobs(currentCompanyId:string){
    const docRef = doc(this.fs, 'companies', currentCompanyId);
    const docSnap = await getDoc(docRef);   
    return docSnap.data();
  }

  async getJobCompanyById(currentCompanyId:string,index:number){  
    const companyRef = doc(this.fs, 'companies', currentCompanyId);
    const companySnapshot = await getDoc(companyRef);
    if (companySnapshot.exists())
    {
      const companyData = companySnapshot.data();
      const updatedJob = companyData['postedJobs'][index] || [];
      return updatedJob.jobId;
    } 
  }

  async addJob(jobData: Job,currentCompanyId:string){
    const jobsCollection = collection(this.fs, 'jobs');
    const docRef =  (await addDoc(jobsCollection, jobData));
    const jobId = docRef.id;
    // then, add this job in postedJobs in company
    const companyRef = doc(this.fs, 'companies', currentCompanyId);
    const companySnapshot = await getDoc(companyRef);
    
    if (companySnapshot.exists()) {
      const companyData = companySnapshot.data();
      const postedJobs = companyData['postedJobs'] || [];
      jobData.jobId = jobId;
      postedJobs.push(jobData);
      await updateDoc(companyRef, { postedJobs: postedJobs });
      console.log('Job added successfully.');
    } else {
      console.error('Company document does not exist.');
    }
  }

  async pauseJob(jobIndex: number, companyId: string) {
    const companyRef = doc(this.fs, 'companies', companyId);
    const companySnapshot = await getDoc(companyRef);
    if (companySnapshot.exists()) {
      const companyData = companySnapshot.data();
      const postedJobs = companyData['postedJobs'] || [];
     
      if (jobIndex !== -1) {
        const jobData =postedJobs[jobIndex] ;
        const id =jobData.jobId;
        const jobDocRef = doc(this.fs, 'jobs', id);
        await deleteDoc(jobDocRef);
      }
      else {
        throw new Error('Job not found in postedJobs array.');
      }
    } 
    else {
      throw new Error('Company document does not exist.');
    }
  }

  async deleteJob(jobIndex: number, companyId: string) {
    const companyRef = doc(this.fs, 'companies', companyId);
    const companySnapshot = await getDoc(companyRef);
    if (companySnapshot.exists()) {
      const companyData = companySnapshot.data();
      const postedJobs = companyData['postedJobs'] || [];
     
      if (jobIndex !== -1) {
        const jobData =postedJobs[jobIndex] ;
        const id =jobData.jobId;
        const jobDocRef = doc(this.fs, 'jobs', id);
        await deleteDoc(jobDocRef);
          postedJobs.splice(jobIndex, 1);
        await updateDoc(companyRef, { postedJobs: postedJobs });
      }
      else {
        throw new Error('Job not found in postedJobs array.');
      }
    } 
    else {
      throw new Error('Company document does not exist.');
    }
  }

  async updateJob(companyId: string,jobIndex:number, jobData: any): Promise<void> {

    const companyRef = doc(this.fs, 'companies', companyId);
    const companySnapshot = await getDoc(companyRef);
    if (companySnapshot.exists()) {
      const companyData = companySnapshot.data();
      const postedJobs = companyData['postedJobs'] || [];
      if (jobIndex < 0 || jobIndex >= postedJobs.length) {
        throw new Error('Invalid job index');
      }
      const job =postedJobs[jobIndex] ;
      const id =job.jobId;
      const jobDocRef = doc(this.fs, 'jobs', id);
      await updateDoc(jobDocRef, jobData);

      postedJobs[jobIndex] = jobData;
      await updateDoc(companyRef, { postedJobs: postedJobs });
    };
    
   
  }

  async updateJobInJobsCollection(jobId: string, updatedJobData: Job): Promise<void> {
    const jobRef = doc(this.fs, 'jobs', jobId);
    await setDoc(jobRef, updatedJobData); 
  }

  async updateUser(userId: string, userData: any): Promise<void> {
    try {
      const userRef = doc(this.fs, 'user', userId);
      await setDoc(userRef, userData);
      console.log('User updated successfully!');
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  async getUserById(userId: string): Promise<any> {
    if (!userId) {
      console.error('User ID is undefined or null.');
      return null;
    }
  
    const docRef = doc(this.fs, 'user', userId);
    const docSnap = await getDoc(docRef);   
    
    if (!docSnap.exists()) {
      console.error(`User with ID ${userId} does not exist.`);
      return null;
    }
  
    return docSnap.data();
  }

  async getCompanyById(companyId: string): Promise<any> {
    if (!companyId) {
      console.error('User ID is undefined or null.');
      return null;
    }
  
    const docRef = doc(this.fs, 'companies', companyId);
    const docSnap = await getDoc(docRef);   
    
    if (!docSnap.exists()) {
      console.error(`company with ID ${companyId} does not exist.`);
      return null;
    }
  
    return docSnap.data();
  }
  
  async updateCompany(companyId: string, companyData: any): Promise<void> {
    try {
      const companyRef = doc(this.fs, 'companies', companyId);
      await setDoc(companyRef, companyData);
      console.log('Company updated successfully!');
    } catch (error) {
      console.error('Error updating company:', error);
      throw error;
    }
  }

}
