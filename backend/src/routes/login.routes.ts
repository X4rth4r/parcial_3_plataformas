import { Router } from 'express';
import { login } from '../login/login.controller';

const router = Router();

router.post('/', login);

export default router;