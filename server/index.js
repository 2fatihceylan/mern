const express = require('express');
const dotenv = require('dotenv').config();
const color = require('colors');
const port = process.env.PORT||5000;
const {errorHandler} = require('./middlewares/errorMiddleware');
const app = express();

const connectDb = require('./config/db');
connectDb();


app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(errorHandler);




const goalRequire = require('./routes/goalRoutes');
app.use('/api/goals', goalRequire);





app.listen(port, ()=>{
    console.log('Server started');
})