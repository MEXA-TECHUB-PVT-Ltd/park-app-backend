
const mongoose = require ( "mongoose")
const reviewsModel = require ("../models/reviewsModel")


exports.getAllReviews = async (req,res)=>{
try{
    const result = await reviewsModel.find({});
    if(result.length > 0){
        res.json({
            message : "All reviews of users fetched successfully",
            result: result
        })
    }
    else{
        res.json({
            message: "No review found by any user",
            result: result
        })
    }
}  
catch(error){
    res.json({
        message: "Error occurred while fetching reviews",
        Error : error,
        errorMessage : err.message
    })
} 

}


exports.getReviewsByUserId =async (req,res)=>{
    const user_id = req.body.user_id;
    try{
        const result = await reviewsModel.find({user_id: user_id});
        if(result.length > 0){
            res.json({
                message : "All reviews of this user fetched successfully",
                result: result
            })
        }
        else{
            res.json({
                message: "No review found of user",
                result: result
            })
        }
    }  
    catch(error){
        res.json({
            message: "Error occurred while fetching reviews",
            Error : error,
            errorMessage : err.message
        })
    } 
}
