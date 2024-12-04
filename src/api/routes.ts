import express from 'express';
import jobOfferRouter from './job-offer/job-offer.router';

const router = express.Router();

router.use('/job-offers', jobOfferRouter);

export default router;
