
const SavesModel= require("../models/SavedRoutesModels")
const mongoose  = require("mongoose");




exports.getSavedRoutes = (req,res) =>{

   SavesModel.find({}).populate("routeId").
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

exports.getSavedRoutesByUserId = (req,res) =>{
    const userId = req.params.userId;
    SavesModel.find({userId:userId}).populate("routeId").
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

exports.createSaveRoute= (req,res) => {

    const userId = req.body.userId;
    const savedTime = req.body.saveTime;
    const name = req.body.name;
    const routeId= req.body.routeId;



    if(userId && routeId !== null && typeof userId  && typeof routeId!== "undefined"){

        const newRoute= new SavesModel({
            _id:mongoose.Types.ObjectId(),
            userId:userId,
            savedTime:savedTime,
            name:name,
            routeId:routeId    
        })

        newRoute.save(function(err, result){
            try{
                res.json({
                    message:"Route successfully saved for this userId :"+userId,
                    data: result,
                })
            }
            catch(err){
                res.json({
                    message:"Error in saving Route for user",
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

exports.deleteSavedRoutes = ( req,res) =>{

    const savedRoutesId = req.params.savedRoutesId ;
    
    
    if(savedRoutesId !==null && typeof savedRoutesId !=="undefined"){
    SavesModel.deleteOne({_id:savedRoutesId} , function(err , result){
        
        if (!err){
            if(result.deletedCount > 0){
                res.json({
                    message:"deleted success",
                    result:result
                })
            }else{
                res.json({
                    message:"Nothing deleted , This saved Route Id  may not exist"
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
    res.json("savedRoutesId may be null or undefined")
   }
}


exports.updateSavedRoute = (req,res)=>{

    const savedRoutesId = req.body.savedRoutesId ;

    const userId = req.body.userId;
    const savedTime = req.body.saveTime;
    const name = req.body.name;
    const routeId= req.body.routeId;


    if(savedRoutesId!==null && typeof savedRoutesId !=="undefined"){
        
        SavesModel.findOneAndUpdate ({_id: savedRoutesId}, 
            {
                userId:userId,
                savedTime:savedTime,
                name:name,
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
                            message: "couldn't update , Record with this savedRoutesId may be not found"
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
        res.json("savedRoutesId  may be null or undefined")
       }
}
