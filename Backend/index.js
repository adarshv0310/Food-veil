import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authrouter from './routes/auth.route.js';


dotenv.config();
const app = express();


const port = process.env.PORT || 8001;
const password = process.env.PASSWORD;
const encodedPassword = encodeURIComponent(password);



const URI = `mongodb+srv://adarshsingh2003v:${encodedPassword}@food.mqsmc.mongodb.net/?retryWrites=true&w=majority&appName=food`;




// mongodb connection 


mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 20000,
    })
    .then(() => console.log("Mongodb Connected"))
    .catch((err) => console.log("Mongodb error : ", err));





// middlewares 

app.use(cors());
app.use(express.json());
app.use(cookieParser());



// route connection

app.use('/ddauth', authrouter);



app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong ";


    return res.status(status).json({
        success: false,
        status,
        message,
    });
});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})