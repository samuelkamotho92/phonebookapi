const express = require('express');
const dotenv = require('dotenv');
const userRoute = require('./Routers/userRouter');
const groupRoute = require('./Routers/groupRouter');
dotenv.config({path:'./.env'});
const app = express();

app.use(express.json())
app.use('/users',userRoute)
app.use('/groups',groupRoute)


app.listen(process.env.PORT,()=>{
    console.log(`server listening on ${process.env.PORT}`);
})