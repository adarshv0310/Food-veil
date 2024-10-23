import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authrouter from './routes/auth.route.js';
import userrouter from './routes/user.route.js';
import bodyParser from 'body-parser';
import resturantrouter from './routes/resturo.route.js';
import menuRouter from './routes/menu.route.js';
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

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());



// route connection

app.use('/auth', authrouter);
app.use('/user', userrouter);
app.use('/resturant', resturantrouter);
app.use('/menu', menuRouter);




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