const nodemailer=require("nodemailer");
const User=require("../model/user.js");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");


var email;

let transporter = nodemailer.createTransport({
    service : 'Gmail',
    
    auth: {
      user: 'nikhil.bhatt.000@gmail.com',
      pass: 'Nik626Nik@gmail',
    }
    
});


var otp;


const sendOtp=async(req,res)=>{

   

    try{

        email=req.body.email;


        const existingUser=await User.findOne({email});

    if(existingUser){
    return res.status(400).json({
        errorMessage:'this email account already exist'
    })
}


       otp = Math.random();
        otp = otp * 1000000;
        otp = parseInt(otp);
        console.log("this is OTP-  ",otp);

     // send mail with defined transport object
    var mailOptions={
        from:`nikhil.bhatt.000@gmail.com`,
        to: req.body.email,
       subject: "Otp for registration is: ",
       html: "<h3>OTP for account verification is </h3>"  + "<h1 style='font-weight:bold;'>" + otp +"</h1>" // html body
     };
     
     transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);   
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  
        res.status(200).send('otp');
    });

    }
    catch(err){
        console.log(err)
        res.status(500).send();
    }
}








const verifyOtp=async(req,res)=>{
    try{
        if(req.body.otp==otp){
           return res.status(200).json(true);
        }
        else if(req.body.otp!=otp){
          return  res.status(200).json(false);

        }

    }
    catch(err){
     return  res.status(500).send(err);
    }
}



const addUser=async(req,res)=>{
    try{
   let {firstname,lastname,email,phone,password}=req.body;
    
//    validation
if(password.length<4){
    return res.status(404).json({
        errorMessage:"enter password of at least 4 characters"
    });
}


if(phone.length!==10){
    return res.status(404).json({
        errorMessage:"phone validation wrong"
    });
}


const existingUser=await User.findOne({email});

if(existingUser){
    return res.status(400).json({
        errorMessage:'this email account already exist'
    });
}



// password hashing

const salt=await bcrypt.genSalt();
password=await bcrypt.hash(password,salt);





const newUser=new User({
    firstname,lastname,email,phone,password
});


const savedUser=await newUser.save();


res.status(200).send();


// // jwt
// const token=jwt.sign({
//     admin:savedUser.id
// },process.env.JWT_SECRET)


// res.cookie("token",token,{
//     httpOnly:true
// }).send();



    }
    catch(err){
        console.log(err);
        res.status(500).send();
    }
}





const loginUser=async(req,res)=>{
    try{
        const {email,password}=req.body;

        // validate

        const existingUser=await User.findOne({email});

        if(!existingUser){
            return res.status(400).json({
                errorMessage:"wrong credential"
            })
        }


        // password matching boolean
        const passwordCorrect=await bcrypt.compare(password,existingUser.password);

        if(!passwordCorrect){
            return res.status(400).json({
                errorMessage:"wrong credential"
            });
        }

        const token=jwt.sign({
            user:existingUser._id
        },process.env.JWT_SECRET);




        // send the token in the http only cookies

        res.cookie("token",token,{
            httpOnly:true
        }).json(existingUser);


    }
    catch(err){
        console.log(err)
        res.status(500).send();
    }
}




const logoutUser=(req,res)=>{
    res.cookie("token","",{
        httpOnly:true,
        expires:new Date(0),
    }).send();
}




const loggedInUser=(req,res)=>{
    try{
        const token=req.cookies.token;
        if(!token){
            return res.json(false);
        }

        jwt.verify(token,process.env.JWT_SECRET);

        return res.json(true);
    }
    catch(err){
        return res.json(false);
    }
}






const updateUser=async(req,res)=>{
    try{
   let {id,firstname,lastname,email,phone,password,isPart,isWin}=req.body;
    


const existingAdmin=await User.findOne({email});

if(!existingAdmin){
    return res.status(400).json({
        errorMessage:'this email does not exist'
    })
}




// const salt=await bcrypt.genSalt();
// password=await bcrypt.hash(password,salt);



const updateObj={
    _id:id,firstname,lastname,email,phone,password,isPart,isWin
}



const savedUser=await User.findOneAndUpdate({_id:id},updateObj);


const token=jwt.sign({
    user:savedUser._id
},process.env.JWT_SECRET);


res.cookie("token",token,{
    httpOnly:true
}).json(savedUser);





    }
    catch(err){
        console.log(err);
        res.status(500).send();
    }
}









module.exports={sendOtp,verifyOtp,addUser,loginUser,logoutUser,loggedInUser,updateUser};