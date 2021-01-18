import express from 'express';
import * as CateController from '../controller/categories.js';

const router = express.Router();

router.get('/', CateController.getAllCategory)
export default router;