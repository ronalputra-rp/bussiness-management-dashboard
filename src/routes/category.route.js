import express from "express";
import { getCategory, addCategory, editCategory, deleteCategory } from "../controllers/category.controller.js";

const router = express.Router();

router.get('/',getCategory);
router.post('/',addCategory);
router.patch('/:id',editCategory);
router.delete('/:id',deleteCategory);

export default router;