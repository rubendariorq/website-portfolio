import { Router } from 'express';
import { userController } from '../controllers/UserControllers';

const router:Router = Router();

router.get('/', userController.index);

export default router;