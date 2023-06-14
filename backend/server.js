const express = require('express');
const dotenv = require('dotenv');
const userRoute = require('./Routers/userRouter');
dotenv.config({path:'./.env'});
const app = express();

app.use(express.json())
app.use('/users',userRoute)

app.listen(process.env.PORT,()=>{
    console.log(`server listening on ${process.env.PORT}`);
})