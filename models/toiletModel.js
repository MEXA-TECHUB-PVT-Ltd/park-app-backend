
const mongoose = require('mongoose');

const toiletSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    locationType: {
      type: mongoose.Schema.Types.ObjectId,
      ref : "locationType"
    },
    name:String,
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
})
toiletSchema.index( { location : "2dsphere" } );
module.exports =mongoose.model("toilet" , toiletSchema);
