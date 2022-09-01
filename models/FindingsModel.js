const mongoose = require("mongoose");

const findingsSchema = new mongoose.Schema({
  _id:mongoose.Schema.Types.ObjectId,
   userId : mongoose.Schema.Types.ObjectId,
   description: String,
   routeId : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "route"
   },
});

const findingModel = mongoose.model("finding", findingsSchema);

module.exports = findingModel;