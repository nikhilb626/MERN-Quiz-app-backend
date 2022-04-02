const jwt=require("jsonwebtoken");
const User=require("../model/user.js");


async function isAdmin(req,res,next){
    try{
        const token=req.cookies.token;

        if(token){
            const verified=jwt.verify(token,process.env.JWT_SECRET);


            const userData=await User.find({_id:verified.user});

            if(userData[0].isAdmin){
                next();
            }else{
                return res.status(401).json({
                    errorMessage:"unauthorized admin"
                });
            }
        }else{
            return res.status(401).json({
                errorMessage:"unauthorized admin"
            });
        }

    }
    catch(err){
        console.log(err);
        res.status(401).json({
            errorMessage:"unauthorized admin"
        })
    }
}


module.exports=isAdmin;