


const toiletCommentModel= require("../models/ToiletCommentsModel")
const mongoose  = require("mongoose");




exports.getToiletComments = (req,res) =>{

   toiletCommentModel.find({}).populate("toiletId").
   exec(function (err, foundResult) {
    if(!err){
        if(foundResult!==null && typeof foundResult !=="undefined"){
            res.json({
                message:"fetched Records",
                result:foundResult
            })
        }else{
            res.json({
                message: "Result is null"
            })
        }
    }else{
        res.json({message: "Result is not found",
                Error: err.message
    })
    }

});
}

exports.getToiletCommentsByUserId = (req,res) =>{
    const userId = req.params.userId;
    toiletCommentModel.find({userId:userId}).populate("toiletId").
    exec(function (err, foundResult) {
        if(!err){
            if(foundResult!==null && typeof foundResult !=="undefined"){
                res.json({
                    message:"fetched Records",
                    result:foundResult
                })
            }else{
                res.json({
                    message: "Result is null"
                })
            }
        }else{
            res.json({message: "Result is not found",
                    Error: err.message
        })
        }
 
 });
 }

exports.addToiletComments= (req,res) => {

    const userId = req.body.userId;
    const description = req.body.description;
    const toiletId= req.body.toiletId;
    



    if(userId && toiletId !== null && typeof userId  && typeof toiletId!== "undefined"){

        const newToiletComments= new toiletCommentModel({
            _id:mongoose.Types.ObjectId(),
            userId:userId,
            description:description,
            toiletId:toiletId    
        })

        newToiletComments.save(function(err, result){
            try{
                res.json({
                    message:"Toilet comment of user saved for this userId :"+userId,
                    data: result,
                })
            }
            catch(err){
                res.json({
                    message:"Error in saving toilet comment for user",
                    Error: err.message,
                    error: err
                })
            }
        })
    }
    else{
        res.json({
            message: "toiletId or userId may be null or undefined",
        })
    }

    
}

exports.deleteToiletComment = ( req,res) =>{

    const toiletCommentId = req.params.toiletCommentId ;
    
    
    if(toiletCommentId !==null && typeof toiletCommentId !=="undefined"){
    toiletCommentModel.deleteOne({_id:toiletCommentId} , function(err , result){
        
        if (!err){
            if(result.deletedCount > 0){
                res.json({
                    message:"deleted success",
                    result:result
                })
            }else{
                res.json({
                    message:"Nothing deleted , This toiletCommentId  may not exist"
                })
            }
    
        }else{
            res.json({
                message: "Error occurring in deleted"
            })
        }
    })
}
    else{
    res.json("toiletCommentId may be null or undefined")
   }
}


exports.updateToiletComment= (req,res)=>{

    const toiletId = req.body.toiletId ;
    const userId = req.body.userId;
    const description = req.body.description;
    const toiletCommentId= req.body.toiletCommentId;


    if(toiletCommentId!==null && typeof toiletCommentId !=="undefined"){
        
        toiletCommentModel.findOneAndUpdate ({_id: toiletCommentId}, 
            {
                userId:userId,
                description:description,
                toiletId:toiletId  
                
            },
            {
                new: true,
            }, function(err, result) {
                if(!err){
                    if(result!==null && typeof result !=="undefined"){
                        res.json({
                            message: "Updated successfully",
                            updatedResult: result
                        })
                    }else{
                        res.json({
                            message: "couldn't update , Record with this toiletCommentId may be not found"
                        })
                    }
                   
                }
                else{
                    res.json({
                        message: "Error updating",
                        Error: err.message,
                    })
                }
               
            })
    }
        else{
        res.json("toiletCommentId  may be null or undefined")
       }
}
