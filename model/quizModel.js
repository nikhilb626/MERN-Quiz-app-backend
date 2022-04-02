const mongoose=require("mongoose");



const quizSchema=new mongoose.Schema({
    firstname:{
        type:String,required:true
    },
    lastname:{
        type:String,required:true
    }
    ,email:{
        type:String,required:true,unique:true
    },
    phone:{
        type:Number,required:true,unique:true
    },
    score:{
        type:Number,required:true
    }
})




const Quiz=mongoose.model("quiz",quizSchema);

module.exports=Quiz;