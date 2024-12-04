import mongoose from 'mongoose';
import { JobOffer } from './job-offer.entity';

const jobOfferSchema = new mongoose.Schema<JobOffer>({
  title: { type: String },
  description: String,
  company: String,
  city: String,
  date: String,
  smartWorking: Boolean,
  salary: Number,
  contract: Number
});

jobOfferSchema.set('toJSON', {
  virtuals: true,
  transform: (_, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

export const JobOfferModel = mongoose.model<JobOffer>('JobOffer', jobOfferSchema);
