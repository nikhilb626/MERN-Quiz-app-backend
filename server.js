const express=require("express");
const dotenv=require('dotenv');
const bodyParser=require("body-parser");

const cookieParser=require("cookie-parser");
const cors=require("cors");


const app=express();



dotenv.config({path:"./config.env"});

require('./db/conn');



const UserRoutes=require("./service/userRouter.js");
const QuizRoutes=require("./service/quizRouter.js");



app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}))


app.use(cookieParser());


app.use(cors({
    origin:[`http://localhost:3000`],
    credentials:true
}))


app.use("/userapi",UserRoutes);
app.use("/quizapi",QuizRoutes);




const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`server running at port ${PORT}`)
})