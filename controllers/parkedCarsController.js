

const parkedCarsModel= require("../models/parkedCarsModel")
const mongoose  = require("mongoose");




exports.getParkedCars = (req,res) =>{

    parkedCarsModel.find({}).populate("locationType").
    exec(function(err, result){
        try{
            res.json({
                message: "All fetched parking history is:",
                data: result
            })
        }
        catch(err){
            res.json({
                message: "Error in fetching",
                Error: err.message,
                error: err
            })
        }

    })
}

exports.getOnlyParkedCars = (req,res) =>{

    parkedCarsModel.find({isParked:true}).populate("locationType").
    exec(function(err, result){
        try{
            res.json({
                message: "All Current parked Cars with Locations and Details:",
                data: result
            })
        }
        catch(err){
            res.json({
                message: "Error in Fetching Parked cars",
                Error: err.message,
                error: err
            })
        }

    })
}

exports.getParkedCarsByUserId= (req,res) =>{
    const userId = req.params.userId

    if(userId !==null && typeof userId !=="undefined" ){
        parkedCarsModel.find({userId:userId}).populate("locationType").
        exec(function(err, result){
            try{
                res.json({
                    message: "All fetched parked Cars are:",
                    data: result
                })
            }
            catch(err){
                res.json({
                    message: "Error in fetched parked Cars",
                    Error: err.message,
                    error: err
                })
            }
    
        })
    }
    else{
        res.json("user ID may be null or undefined")
    }
    
}


exports.parkCar= (req,res) => {

    const parkTime = req.body.parkTime;
    const unParkTime = req.body.unParkTime;
    const location = req.body.location;
    const carPlateNumber = req.body.carPlateNumber;
    const sectionNumber = req.body.sectionNumber;
    const comment = req.body.comment;
    const userId = req.body.userId;
    const locationTypeId = req.body.locationTypeId;
    const totalParkingTime = req.body.totalParkingTime;
    

    if(carPlateNumber &&  parkTime && location !== null && typeof carPlateNumber && typeof parkTime && typeof location !=="undefined"){
        const park= new parkedCarsModel({
            _id:mongoose.Types.ObjectId(),
            userId:userId,
            parkTime: parkTime,
            location: location,
            carPlateNumber: carPlateNumber,
            sectionNumber: sectionNumber,
            comment: comment,
            locationType:locationTypeId,
            totalParkingTime:totalParkingTime
    
        })

        park.save(function(err, result){
           
            try{
                res.json({
                    message:"vehicle parking successfully saved",
                    data: result,
                })
            }
            catch(err){
                res.json({
                    message:"Error in saving vehicle Parking",
                    Error: err.message,
                    error: err
                })
            }
        })
    }
    else{
        res.json({
            message: "car plate Number , park Time or location may be null or undefined",
        })
    }

    
}

exports.deleteParkings = ( req,res) =>{

    const parkingId = req.params.parkingId ;
    
    if(parkingId !==null && typeof parkingId !=="undefined"){
    parkedCarsModel.deleteOne({_id:parkingId} , function(err , result){
        if (!err){
            res.json(result)
        }else{
            res.json(err)
        }
    })
}
    else{
    res.json("parkingId may be null or undefined")
   }
}


exports.unPark= (req,res)=>{

    const parkingId = req.body.parkingId;
    const unParkTime = req.body.unParkTime;
    const totalParkingTime=req.body.totalParkingTime;
    

    if(parkingId!==null && typeof parkingId !=="undefined"){
        
        parkedCarsModel.findOneAndUpdate ({_id: parkingId}, 
            {
                isParked: false,
                unParkTime: unParkTime,
                totalParkingTime: totalParkingTime
            },
            {
                new: true,
            }, function(err, result) {
                if(!err){
                    if(result!==null && typeof result !=="undefined"){
                        res.json({
                            message: "parking status and unPark time Updated successfully",
                            updatedResult: result
                        })
                    }else{
                        res.json({
                            message: "couldn't update , Record with this parking id may be not found"
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
        res.json("parkingId  may be null or undefined")
       }
}
