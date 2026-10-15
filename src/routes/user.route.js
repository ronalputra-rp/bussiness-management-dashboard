import express from "express";
import { getUsers, updateUser, deleteUser } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", getUsers);
router.patch("/", updateUser);
router.delete("/", deleteUser);

export default router;
