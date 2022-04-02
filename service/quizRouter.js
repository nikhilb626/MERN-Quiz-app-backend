const express=require('express');

const {addQuiz,getAllquiz}=require("../controller/quizController");

const auth=require('../middleware/auth');
const isAdmin=require("../middleware/admin");



const router=express.Router();


router.post('/addquiz',auth,addQuiz);
router.get('/showallquiz',auth,isAdmin,getAllquiz);




module.exports=router;