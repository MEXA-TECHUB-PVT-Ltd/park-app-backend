
const FindingsModel= require("../models/FindingsModel")
const mongoose  = require("mongoose");




exports.getFindings = (req,res) =>{

   FindingsModel.find({}).populate("routeId").
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

exports.getFindingsByUserId = (req,res) =>{
    const userId = req.params.userId;
    FindingsModel.find({userId:userId}).populate("routeId").
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

exports.addFindings= (req,res) => {

    const userId = req.body.userId;
    const description = req.body.description;
    const routeId= req.body.routeId;
    



    if(userId && routeId !== null && typeof userId  && typeof routeId!== "undefined"){

        const newRoute= new FindingsModel({
            _id:mongoose.Types.ObjectId(),
            userId:userId,
            description:description,
            routeId:routeId    
        })

        newRoute.save(function(err, result){
            try{
                res.json({
                    message:"finding description of user saved for this userId :"+userId,
                    data: result,
                })
            }
            catch(err){
                res.json({
                    message:"Error in saving findings for user",
                    Error: err.message,
                    error: err
                })
            }
        })
    }
    else{
        res.json({
            message: "RouteId or userId may be null or undefined",
        })
    }

    
}

exports.deleteFindings = ( req,res) =>{

    const findingsId = req.params.findingsId ;
    
    
    if(findingsId !==null && typeof findingsId !=="undefined"){
    FindingsModel.deleteOne({_id:findingsId} , function(err , result){
        
        if (!err){
            if(result.deletedCount > 0){
                res.json({
                    message:"deleted success",
                    result:result
                })
            }else{
                res.json({
                    message:"Nothing deleted , This findingsId  may not exist"
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
    res.json("findingsId may be null or undefined")
   }
}


exports.updateFindings = (req,res)=>{

    const findingsId = req.body.findingsId ;
    const userId = req.body.userId;
    const description = req.body.description;
    const routeId= req.body.routeId;


    if(findingsId!==null && typeof findingsId !=="undefined"){
        
        FindingsModel.findOneAndUpdate ({_id: findingsId}, 
            {
                userId:userId,
                description:description,
                routeId:routeId  
                
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
                            message: "couldn't update , Record with this findingsId may be not found"
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
        res.json("findingsId  may be null or undefined")
       }
}
