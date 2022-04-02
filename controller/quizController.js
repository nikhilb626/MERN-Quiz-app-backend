const Quiz=require("../model/quizModel.js");



const addQuiz=async(req,res)=>{
    try{

    const {firstname,lastname,email,phone,score}=req.body;

    const existingQuiz=await Quiz.findOne({email});

    if(existingQuiz){
        res.status(400).json({
            errorMessage:"already given the quiz"
        });
    }else{
        const newQuiz=new Quiz({
            firstname,lastname,email,phone,score
        });

        const savedQuiz=await newQuiz.save();

        res.json(savedQuiz);

    }

    }
    catch(err){
        console.log(err);
        res.status(500).send();
    }
}



const getAllquiz=async(req,res)=>{
    try{
    const allQuiz=await Quiz.find();
    res.json(allQuiz);

    }
    catch(err){
        res.status(400).send();
    }
}



module.exports={addQuiz,getAllquiz};