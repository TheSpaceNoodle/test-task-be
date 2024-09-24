import { Router } from 'express';

import { getAllCountries, getCountryInfo } from '@/controllers/indexControllers';

const router = Router();

router.get('/', getAllCountries);
router.get('/:countryCode', getCountryInfo);

export default router;
