import { Router } from 'express';
import * as AuthController from '../controllers/auth.controller';
const router = new Router();

router.route('/auth/login').post(AuthController.login);
export default router;