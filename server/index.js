const express = require('express');
const dotenv = require('dotenv').config();
const color = require('colors');
const port = process.env.PORT||5000;
const cors = require('cors');
const {errorHandler} = require('./middlewares/errorMiddleware');
const cookieparser = require('cookie-parser');
const app = express();

const connectDb = require('./config/db');
connectDb();


app.use(cors({
    origin: ["http://localhost:3000","http://localhost:5000"],
    credentials: true
}));


app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieparser());
app.use(errorHandler);




const goalRequire = require('./routes/goalRoutes');
app.use('/api/goals', goalRequire);

const userRequire = require('./routes/userRoutes');
app.use('/api/user', userRequire);





app.listen(port, ()=>{
    console.log('Server started');
})
