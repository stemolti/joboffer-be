import { Company } from "../company/company.entity";

export interface JobOffer {
  jobOfferID: string;
  title: string;
  description: string;
  company: string | Company;
  city: string;
  date: string;
  smartWorking: boolean;
  salary: number;
  contract: number;
}
