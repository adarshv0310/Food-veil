import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import encodeurl from 'encodeurl'


dotenv.config();
const app = express();


//const port = proces.env.PORT || 8001;
const password = process.env.PASSWORD;
console.log('The password is', password);

const encodedPassword = encodeURIComponent(password);

console.log('The encoded password is ', encodedPassword);

const URI = `mongodb+srv://adarshsingh2003v:${encodedPassword}@food.mqsmc.mongodb.net/?retryWrites=true&w=majority&appName=food`;




// mongodb connection 


mongoose.connect(URI)
    .then(() => console.log("Mongodb Connected"))
    .catch((err) => console.log("Mongodb error : ", err));