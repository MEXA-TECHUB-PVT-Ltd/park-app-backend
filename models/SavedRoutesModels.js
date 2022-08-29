const mongoose = require("mongoose");

const SavedRoutesSchema = new mongoose.Schema({
  _id:mongoose.Schema.Types.ObjectId,
   userId : mongoose.Schema.Types.ObjectId,
   name : String,
   savedTime :{
    type : Date
   } ,
   routeId : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "route"
   },
});

const savedRoutes = mongoose.model("savedRoute", SavedRoutesSchema);

module.exports = savedRoutes;