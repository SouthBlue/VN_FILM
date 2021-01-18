import express from 'express';
import * as TypeController from '../controller/type.js';

const router = express.Router();

router.get('/', TypeController.getAllType)
export default router;