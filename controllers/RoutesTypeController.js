
const RoutesTypeModel= require("../models/RouteTypeModel")
const mongoose  = require("mongoose");




exports.getRouteType = (req,res) =>{

    RoutesTypeModel.find({}, (err , result)=>{
        try{
            res.json({
                message: "All fetched Routes types are :",
                data: result
            })
        }
        catch(err){
            res.json({
                message: "Error in fetched Routes types",
                Error: err.message,
                error: err
            })
        }

    })
}
exports.createRouteType= (req,res) => {

    const routeType = req.body.routeType;
    if(routeType!== null && typeof routeType !== "undefined"){
        const newRouteType= new RoutesTypeModel({
            _id:mongoose.Types.ObjectId(),
            routeType: routeType,
    
        })

        newRouteType.save(function(err, result){
            try{
                res.json({
                    message:"RouteType successfully saved",
                    data: result,
                })
            }
            catch(err){
                res.json({
                    message:"Error in saving Route Type",
                    Error: err.message,
                    error: err
                })
            }
        })
    }
    else{
        res.json({
            message: "Route Type may be null or undefined",
        })
    }

    
}

exports.deleteRoutesTypes = ( req,res) =>{

    const routeTypeId = req.params.routeTypeId ;
    
    if(routeTypeId !==null && typeof routeTypeId !=="undefined"){
    RoutesTypeModel.deleteOne({_id:routeTypeId} , function(err , result){
        if (!err){
            res.json(result)
        }else{
            res.json(err)
        }
    })
}
    else{
    res.json("routeTypeId may be null or undefined")
   }
}


exports.updateRouteType = (req,res)=>{

    const routeTypeId = req.body.routeTypeId;
    const routeType= req.body.routeType;

    if(routeTypeId!==null && typeof routeTypeId !=="undefined"){
        
        RoutesTypeModel.findOneAndUpdate ({_id: routeTypeId}, 
            {
                routeType: routeType,
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
        res.json("routeTypeId  may be null or undefined")
       }
}
