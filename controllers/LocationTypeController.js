
const locationTypeModel= require("../models/locationTypeModel")
const mongoose  = require("mongoose");




exports.getLocationType = (req,res) =>{

    locationTypeModel.find({}, (err , result)=>{
        try{
            res.json({
                message: "All fetched location types are :",
                data: result
            })
        }
        catch(err){
            res.json({
                message: "Error in fetched location types",
                Error: err.message,
                error: err
            })
        }

    })
}
exports.createLocationType= (req,res) => {

    const locationType = req.body.locationType;
    if(locationType!== null && typeof locationType !== "undefined"){
        const newLocationType= new locationTypeModel({
            _id:mongoose.Types.ObjectId(),
            locationType: locationType,
    
        })

        newLocationType.save(function(err, result){
            try{
                res.json({
                    message:"location successfully saved",
                    data: result,
                })
            }
            catch(err){
                res.json({
                    message:"Error in saving location Type",
                    Error: err.message,
                    error: err
                })
            }
        })
    }
    else{
        res.json({
            message: "location Type may be null or undefined",
        })
    }

    
}

exports.deleteLocationType = ( req,res) =>{

    const locationTypeId = req.params.locationTypeId ;
    
    if(locationTypeId !==null && typeof locationTypeId !=="undefined"){
    locationTypeModel.deleteOne({_id:locationTypeId} , function(err , result){
        if (!err){
            res.json(result)
        }else{
            res.json(err)
        }
    })
}
    else{
    res.json("locationTypeId may be null or undefined")
   }
}


exports.updateLocationType = (req,res)=>{

    const locationTypeId = req.body.locationTypeId;
    const locationType= req.body.locationType;

    if(locationTypeId && locationType!==null && typeof locationTypeId && typeof locationType!=="undefined"){
        
        locationTypeModel.findOneAndUpdate ({_id: locationTypeId}, 
            {
                locationType: locationType,
            },
            {
                new: true,
            }, function(err, result) {
                res.json({
                    message: "Updated successfully",
                    updatedResult: result
                })
            })
    }
        else{
        res.json("locationTypeId Or locationType may be null or undefined")
       }
}
