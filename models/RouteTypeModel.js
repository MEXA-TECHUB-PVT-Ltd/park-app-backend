
const mongoose= require('mongoose');

const routeTypeSchema= new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    routeType: String

})

module.exports = mongoose.model("routesType" , routeTypeSchema)