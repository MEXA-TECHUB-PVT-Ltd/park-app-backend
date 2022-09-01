
const RoutesModel= require("../models/RoutesModel")
const mongoose  = require("mongoose");




exports.getRoutes = (req,res) =>{

   RoutesModel.find({}).populate("routeTypeId").
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
exports.getRouteByRouteTypeId = (req,res) =>{
    const routeTypeId = req.params.routeTypeId;
    RoutesModel.find({routeTypeId:routeTypeId}).populate("routeTypeId").
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

exports.createRoutes= (req,res) => {

    const routeTypeId = req.body.routeTypeId;
    const pointA = req.body.pointA;
    const pointB = req.body.pointB; 
    const distance = req.body.distance;
    const approxTime= req.body.approxTime;


    if(routeTypeId!== null && typeof routeTypeId !== "undefined"){

        const newRoute= new RoutesModel({
            _id:mongoose.Types.ObjectId(),
            routeTypeId: routeTypeId,
            pointA: pointA,
            pointB: pointB,
            distance: distance,
            approxTime: approxTime
    
        })

        newRoute.save(function(err, result){
            try{
                res.json({
                    message:"Route successfully saved",
                    data: result,
                })
            }
            catch(err){
                res.json({
                    message:"Error in saving Route",
                    Error: err.message,
                    error: err
                })
            }
        })
    }
    else{
        res.json({
            message: "RouteId may be null or undefined",
        })
    }

    
}

exports.deleteRoutes = ( req,res) =>{

    const routeId = req.params.routeId ;
    console.log(routeId)
    
    if(routeId !==null && typeof routeId !=="undefined"){
    RoutesModel.deleteOne({_id:routeId} , function(err , result){
        
        if (!err){
            res.json(result)
        }else{
            res.json(err)
        }
    })
}
    else{
    res.json("routeId may be null or undefined")
   }
}


exports.updateRoute = (req,res)=>{

    const routeId = req.body.routeId;
    const routeTypeId = req.body.routeTypeId;
    const pointA= req.body.pointA;
    const pointB=req.body.pointB;
    const distance = req.body.distance;
    const approxTime= req.body.approxTime;

    if(routeId!==null && typeof routeId !=="undefined"){
        
        RoutesModel.findOneAndUpdate ({_id: routeId}, 
            {
            routeTypeId: routeTypeId,
            pointA: pointA,
            pointB: pointB,
            distance: distance,
            approxTime: approxTime
                
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
                            message: "couldn't update , Record with this Route Id may be not found"
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
        res.json("routeId  may be null or undefined")
       }
}
