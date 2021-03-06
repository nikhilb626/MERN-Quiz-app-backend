const mongoose=require("mongoose");



const userSchema=new mongoose.Schema({
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

    password:{
        type:String,required:true
    },isAdmin:{
        type:Boolean,default:false,required:true
    },isPart:{
        type:Boolean,default:false
    },
    isWin:{
        type:Boolean,default:false
    }
})




const User=mongoose.model("user",userSchema);

module.exports=User;