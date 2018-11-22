import { addressView, transactionView } from '../controllers/address-controller';
import express from 'express';

const router = express.Router();
router.get('/:address/tx/:readerAddress-:sourceAddress-:counter', transactionView);
router.get('/:address', addressView);

export default router;
