import { Router } from "express";
import * as transactionController from '../controllers/transactionController';

const router = Router();

//get routes
router.get('/', transactionController.getTransactions);

//post routes
router.post('/email-confirm', transactionController.emailConfirm);


export default router;