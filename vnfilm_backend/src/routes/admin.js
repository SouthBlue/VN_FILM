import express from 'express';
import * as adminController from '../controller/admin.js';
import {checkAuthAdmin} from '../middlewares/check-auth.js'
const router = express.Router();

/* GET one user */

router.get('/total', checkAuthAdmin, adminController.Dashboard);

export default router;