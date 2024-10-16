import { updateUser, deleteUser } from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/verifyusermiddlewre.js";
import express from 'express';


const router = express.Router();

router.put('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);

export default router;