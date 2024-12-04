import express from 'express';
import { list, detail, add, update, remove } from './job-offer.controller';
import { validate } from '../../utils/validation-middleware';
import { JobOfferQueryDTO } from './job-offer.dto';

const router = express.Router();

router.get('/', list);
router.get('/:id', detail);

router.post('/', validate(JobOfferQueryDTO), add);
router.put('/:id', validate(JobOfferQueryDTO), update);
router.delete('/:id', remove);

export default router;
