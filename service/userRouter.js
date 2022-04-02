const express=require("express");

const {sendOtp,verifyOtp,addUser,loginUser,logoutUser,loggedInUser,updateUser}=require("../controller/userController");


const auth=require('../middleware/auth');

const router=express.Router();


router.post("/sendotp",sendOtp);
router.post("/verifyotp",verifyOtp);
router.post("/adduser",addUser);
router.post("/loginuser",loginUser);
router.get("/logoutuser",logoutUser);
router.get("/loggedIn",loggedInUser);
router.put('/updateuserstate',auth,updateUser)

module.exports=router;