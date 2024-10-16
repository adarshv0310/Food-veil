import { updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/verifyusermiddlewre.js";
import express from 'express';


const router = express.Router();

router.put('/update/:id', verifyToken, updateUser);


export default router;