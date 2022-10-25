const mongoose = require("mongoose");

const locationsSchema = new mongoose.Schema({
_id:mongoose.Schema.Types.ObjectId,
 type:{
  type:String,
  enum:["walking-route" , "toilet" , "parking" ,"dog-walk"]
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
images:[Object],

title:String,
description:String,
distance:String,
avg_time:String,
})
module.exports = mongoose.model("location", locationsSchema);