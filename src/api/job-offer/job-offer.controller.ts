import { NextFunction, Request, Response } from 'express';
import jobOfferSrv from './job-offer.service';

import { JobOfferQueryDTO } from './job-offer.dto';
import { NotFoundError } from '../../errors/not-found';
import { TypedRequest } from '../../utils/typed-request';
import { JobOffer } from './job-offer.entity';

export const list = async (
  req: TypedRequest<unknown, JobOfferQueryDTO>,
  res: Response,
  next: NextFunction
) => {
  try {
    const results = await jobOfferSrv.find(req.query);
    res.json(results);
  } catch (err) {
    next(err);
  }
};

export const detail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const item = await jobOfferSrv.getById(id);
    if (!item) {
      throw new NotFoundError();
    }

    res.json(item);
  } catch (err) {
    next(err);
  }
};

export const add = async (
  req: TypedRequest<JobOfferQueryDTO>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, description, company, city, date, smartWorking, salary, contract } = req.body;
    const newItem: Partial<Omit<JobOffer, 'id'>> = {
      title: title,
      description: description,
      company: company,
      city: city,
      date: date,
      smartWorking: smartWorking,
      salary: salary,
      contract: contract
    };

    const saved = await jobOfferSrv.add(newItem);
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
};

export const update = async (
  req: TypedRequest<JobOfferQueryDTO>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, description, company, city, smartWorking, salary, contract } = req.body;
    const { id } = req.params;
    const updated = await jobOfferSrv.update(id, {
      title,
      description,
      company,
      city,
      smartWorking,
      salary,
      contract
    });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await jobOfferSrv.remove(id);
    res.send();
  } catch (err) {
    next(err);
  }
};
