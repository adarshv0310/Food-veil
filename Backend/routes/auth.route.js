import express from 'express';
import { Signup, Signin, Signout } from '../controllers/auth.controller.js';
import {
    verifyToken

} from '../middlewares/verifyusermiddlewre.js'

const router = express.Router();



router.post('/signin', Signin);
router.post('/signup', Signup);
router.post('/signout/:id', verifyToken, Signout);
/*router.post('/signin', (req, res, next) => {
    console.log("Received POST /signin"); // Debug log
    next();
}, Signin);*/



export default router;