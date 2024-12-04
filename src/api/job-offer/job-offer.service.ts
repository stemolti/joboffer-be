import { JobOffer } from './job-offer.entity';
import { JobOfferQueryDTO } from './job-offer.dto';
import { JobOfferModel } from './job-offer.model';
import { NotFoundError } from '../../errors/not-found';
export class JobOfferService {
  async find(query: JobOfferQueryDTO): Promise<JobOffer[]> {
    const q: any = {};

    if (query.title) q.title = { $regex: new RegExp(query.title, 'i') };
    if (query.description) q.description = { $regex: new RegExp(query.description, 'i') };

    const sort = query.sortOrder === 'asc' ? 'date' : '-date';
    const limit = query.maxResults || 10;

    return JobOfferModel.find(q).sort(sort).limit(limit);
  }

  async getById(id: string): Promise<JobOffer | null> {
    return JobOfferModel.findById(id);
  }

  async add(jobOffer: Partial<Omit<JobOffer, 'id'>>): Promise<JobOffer> {
    const newItem = await JobOfferModel.create({
      ...jobOffer
    });
    return (await this.getById(newItem.id))!;
  }

  async update(id: string, jobOffer: Partial<Omit<JobOffer, 'id'>>): Promise<JobOffer> {
    const existing = await JobOfferModel.findOne({ _id: id });
    if (!existing) {
      throw new NotFoundError();
    }

    Object.assign(existing, jobOffer);
    await existing.save();
    const updated = await this.getById(id);
    return updated!;
  }

  async remove(id: string): Promise<void> {
    const existing = await JobOfferModel.findOne({ _id: id });
    if (!existing) {
      throw new NotFoundError();
    }

    await JobOfferModel.deleteOne({ _id: id });
  }
}

export default new JobOfferService();
