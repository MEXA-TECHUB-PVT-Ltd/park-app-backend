const mongoose = require("mongoose");

const locationTypeSchema = new mongoose.Schema({
_id:mongoose.Schema.Types.ObjectId,
  locationType:String
})
module.exports = mongoose.model("locationType", locationTypeSchema);