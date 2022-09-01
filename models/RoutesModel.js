const mongoose= require('mongoose');

const routeTypeSchema= new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    routeTypeId :{
        type: mongoose.Schema.Types.ObjectId,
        ref:"routesType"
    },
    pointA: {
        location: {
            type: { 
             type: String,
             default: "Point"
           },
            coordinates: {
              type: [Number], 
             required: [true, "Coordinates are required"] 
           } 
         }
    },
    pointB: {
        location: {
            type: { 
             type: String,
             default: "Point"
           },
            coordinates: {
              type: [Number], 
             required: [true, "Coordinates are required"] 
           } 
         }
    },
    distance:String,
    approxTime:String,

})

 
routeTypeSchema.index( { location : "2dsphere" } )
module.exports = mongoose.model("route" , routeTypeSchema)