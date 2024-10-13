import express from 'express';
import { Signup, Signin } from '../controllers/auth.controller.js';


const router = express.Router();



router.post('/signin', Signin);
router.post('/signup', Signup);

/*router.post('/signin', (req, res, next) => {
    console.log("Received POST /signin"); // Debug log
    next();
}, Signin);*/



export default router;