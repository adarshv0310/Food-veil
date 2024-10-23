import { createMenuItem } from "../controllers/menu.controller.js";
import express from 'express'


const router = express.Router();


router.post('/createmenu', createMenuItem);


export default router;