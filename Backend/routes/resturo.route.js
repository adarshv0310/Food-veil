import { createRestaurant } from "../controllers/resturant.controller.js";
import express from 'express';




const router = express.Router();


router.post('/createresturant', createRestaurant);


export default router;