import express from "express";
import {
    getHeaderTransactions,
    getHeaderTransactionsById,
    getDetailedTransactions,
    addTransactions,
    addDetailedTransactions,
    updateTransactions,
    updateDetailedTransactions,
    deleteAllTransactions,
    deleteDetailedTransactions,
} from "../controllers/transaction.controller";

const router = express.Router();

router.get('/',getHeaderTransactions);
router.get('/:id',getHeaderTransactionsById);
router.get('/:transactionId/details',getDetailedTransactions);
router.post('/',addTransactions);
router.post('/:transactionId/details',addDetailedTransactions);
router.patch('/:id',updateTransactions);
router.patch('/:id/:transactionId/details',updateDetailedTransactions);
router.delete('/:id',deleteAllTransactions);
router.delete('/:id/:transactionId/details',deleteDetailedTransactions);

export default router;