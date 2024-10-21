import { updateUser, deleteUser } from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/verifyusermiddlewre.js";
import express from 'express';
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router.put('/update/:id', verifyToken, upload.single('avatar'), updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);

export default router;