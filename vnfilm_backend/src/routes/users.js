import express from 'express';
import * as userController from '../controller/users.js';
import {checkAuthAdmin} from '../middlewares/check-auth.js'
const router = express.Router();

/* GET one user */

router.get('/:user_id', userController.userGet);

router.post('/login', userController.userLogin);

router.post('/signup', userController.userSignup);

router.get('/', checkAuthAdmin, userController.userGetAll);

router.delete('/:userId', checkAuthAdmin, userController.userDelete);

router.patch('/:userId', userController.userUpdateInfo);

router.patch('/password/:user_id', userController.userUpdatePassword);

export default router;
