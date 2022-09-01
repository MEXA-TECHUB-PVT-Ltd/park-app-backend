const mongoose = require("mongoose");

const ToiletsCommentsSchema = new mongoose.Schema({
  _id:mongoose.Schema.Types.ObjectId,
   userId : mongoose.Schema.Types.ObjectId,
   description: String,
   toiletId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "toilet"
   },
});

const toiletCommentsModel = mongoose.model("toiletComment", ToiletsCommentsSchema);

module.exports = toiletCommentsModel