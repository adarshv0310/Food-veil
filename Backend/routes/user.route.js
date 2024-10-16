import { updateUser } from "../controllers/user.controller";
import { verifyToken } from "../middlewares/verifyusermiddlewre";
import express from 'express';


const router = express.Router();

router.put('/update/:id', verifyToken, updateUser);


export default router;