import { Job } from "./job";

export interface Company {
    id:string
    companyName:string,
    location:string,
    industry:string,
    email:string,
    companySize:string,
    postedJobs:Job[],
    // applicationsoOfJobs: Job[];

}
