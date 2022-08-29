

const ToiletModel= require("../models/toiletModel")
const mongoose  = require("mongoose");





exports.getToilets = (req,res) =>{

    ToiletModel.find({}).populate("locationType").
    exec(function(err, result){
        try{
            res.json({
                message: "All fetched Toilets are:",
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
exports.createToilet= (req,res) => {

    const name = req.body.name;
    const location = req.body.location;
    const locationTypeId = req.body.locationTypeId;


    if(name && location !== null && typeof name && typeof location !== "undefined"){
        const newToilet= new ToiletModel({
            _id:mongoose.Types.ObjectId(),
            name: name, 
            location: location,
            locationType: locationTypeId,
        })

        newToilet.save(function(err, result){
            try{
                res.json({
                    message:"toilet successfully saved",
                    data: result,
                })
            }
            catch(err){
                res.json({
                    message:"Error in saving toilet",
                    Error: err.message,
                    error: err
                })
            }
        })
    }
    else{
        res.json({
            message: "name or location may be null or undefined",
        })
    }

    
}

exports.removeToilet = ( req,res) =>{

    const toiletId = req.params.toiletId;
    
    if(toiletId !==null && typeof toiletId !=="undefined"){
    ToiletModel.deleteOne({_id:toiletId} , function(err , result){
        if (!err){
            res.json({
                message: "toilet deleted",
                DeletedData: result
            })
        }else{
            res.json({
                message: "Could not deleted toilet",
                Error:err.message,
            })
        }
    })
}
    else{
    res.json("toiletId may be null or undefined")
   }
}


exports.updateToiletDetails = (req,res)=>{

    const toiletId = req.body.toiletId;
    const location= req.body.location;
    const name = req.body.name;
    const locationTypeId = req.body.locationTypeId;


    if(toiletId && location!==null && typeof location && typeof toiletId!=="undefined"){
        
        ToiletModel.findOneAndUpdate ({_id: toiletId}, 
            {
                location: location,
                name:name,
                locationType: locationTypeId,
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
        res.json("toilet ID Or location may be null or undefined")
       }
}
