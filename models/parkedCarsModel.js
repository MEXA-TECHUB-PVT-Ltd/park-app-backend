

const mongoose= require('mongoose');  

const parkedCarsSchema = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    userId:mongoose.Schema.Types.ObjectId,
    locationType: {
      type: mongoose.Schema.Types.ObjectId,
      ref : "locationType"
    },
    isParked : {
      type:Boolean,
      default:true
    },
    parkTime : {
            type: Date,
            
          },
    unParkTime: {
        type: Date,
        
      },
      totalParkingTime:{
        type:String,
      },
      location: {
        type: { 
         type: String,
         default: "Point"
       },
        coordinates: {
          type: [Number], 
         required: [true, "Coordinates are required"] 
       } 
     },
      carPlateNumber: {
        type:String,
      }, 
      section : String,
      comment : String
    
})

parkedCarsSchema.index({location:"2dsphere"});
module.exports = mongoose.model("parkedCar" , parkedCarsSchema);