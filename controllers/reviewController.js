
const mongoose = require ( "mongoose")
const reviewsModel = require ("../models/reviewsModel")


exports.getAllReviews = async (req,res)=>{
try{
    const result = await reviewsModel.find({}).populate("location_id").populate("user_id");
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
    const user_id = req.params.user_id;
    try{
        const result = await reviewsModel.find({user_id: user_id}).populate("location_id").populate("user_id");
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

exports.createReview = (req,res)=>{
    const user_id = req.body.user_id;
    const location_id = req.body.location_id;
    const name = req.body.name;
    const review = req.body.review;
    const picture = req.body.picture;

    const newReview = new reviewsModel({
        _id:mongoose.Types.ObjectId(),
        user_id: user_id,
        location_id: location_id,
        name: name,
        review: review,
        picture: picture
    })

    newReview.save(function(err,result){
        try{
            if(result){
                res.json({
                    message: "review has been added ",
                    result: result,
                    statusCode: 201
                })
            }
            else{
                res.json({
                    message: "review has not been added",
                    statusCode: 500
                })
            }
        }
        catch(err){
            res.json({
                message: "error occurred while adding review",
                errorMessage:err.message,
                statusCode: err.statusCode
            })
        }
    })

}

exports.deleteReview = (req,res)=>{
    const review_id = req.params .review_id;

    reviewsModel.deleteOne({_id: review_id} , function(err,result){
        try{
            if(result.deletedCount > 0){
                res.json({
                    message: "review deleted successfully",
                    statusCode:200,
                    result:result
                })
            }
            else{
                res.json({
                    message: "review could not be deleted successfully , review with this id may not exist",
                    statusCode:400
                })
            }
        }
        catch(err){
            res.json({
                message: "error occurred while deleting review",
                Error: error.message,
                statusCode:500
            })
        }
    })
}

exports.updateReview = (req,res)=>{
    const review_id = req.body.review_id;
    const user_id = req.body.user_id;
    const location_id = req.body.location_id;
    const name = req.body.name;
    const review = req.body.review;
    const picture = req.body.picture;

    reviewsModel.findOneAndUpdate({_id: review_id},
        {
        user_id: user_id,
        location_id: location_id,
        name: name,
        review: review,
        picture: picture
            
        },
        {
            new: true
        } , function (err, result) {
            try{
                if(result){
                    res.json({
                        message: "Review has been updated successfully",
                        result: result,
                        statusCode: 201,
                    })
                }
                else{
                    res.json({
                        message: "Review could not be updated successfully , review with this id may not exist",
                        result: result,
                    })
                }
            }
            catch(err){
                res.json({
                    message: "Error occurred while updating review",
                    Error: err,
                    errorMessage: err.message,
                    statusCode:500

                })
            }
        })
    
}