import express from 'express';
import * as CountryController from '../controller/countries.js';

const router = express.Router();

router.get('/', CountryController.getAllCountry)
export default router;