const User = require("../models/User");
const mongoose = require("mongoose");
exports.createUser=(req,res)=>{
  try {
   
    const user= new User({
        _id:mongoose.Types.ObjectId(),
        token: req.body.token
    })
    
    user.save();

    res.json({
      data: { user },
      message: "User Created successfully",
      success: true,
    });
  } catch (e) {
    res.status(400).json({ message: e.message, success: false });
  }
};

exports.getUser=async (req,res)=>{
    const userId = req.params.userId;
    User.findOne({_id:userId}, async function(err,result){
        try{

          const userDetails=await User.aggregate([
            { $match: { _id:result._id} },
            {
                $lookup:
                {
                    from: "savedroutes",
                    localField: "_id",
                    foreignField: "userId",
                    as: "User saved routes"
                }
      
            },
            {
              $lookup:
              {
                  from: "findings",
                  localField: "_id",
                  foreignField: "userId",
                  as: "All User findings about Routes"
              }
      
          },
          {
            $lookup:
            {
                from: "parkedcars",
                localField: "_id",
                foreignField: "userId",
                as: "All Parkings of User"
            }
      
        },
          
        ]);
      
          res.send({
            message:"User Has fetched with his necessary details",
            result:result,
            userDetails:userDetails,
          })
        }
        catch (err) {
          res.status(400).json({ message: err.message, success: false });
        }
    })
 
};

exports.deleteUser=(req,res)=>{
  const userId = req.params.userId;
  User.deleteOne({_id:userId}, function(err,result){
      try{
        if(result.deletedCount > 0){
          res.json({
            message: "document deleted",
            result: result
          })
        }
        else{
          res.json({
            message: "document not found",
            result:result
          }
          )
        }
        
        
      }
      catch (err) {
        res.status(400).json({ message: err.message, success: false });
      }
  })

};
exports.updateUser=(req,res)=>{
  const userId = req.body.userId;
  const token = req.body.token;
  User.findOneAndUpdate({_id:userId},{token:token}, function(err,result){
      try{
          if(result !==null && typeof result !== 'undefined'){
            res.json({
              message: "document updated",
              result:result
            })
          }
          else{
            res.json({
              message: "No changes updated"
            })
          }
        }
      catch (err) {
        res.status(400).json({ message: err.message, success: false });
      }
  })

};