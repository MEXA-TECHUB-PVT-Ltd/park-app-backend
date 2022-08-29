const express = require("express"),
router=express.Router();

const controller = require("../controllers/toiletCommentController")

router.post ("/addToiletComment" ,controller.addToiletComments);
router.get ("/getAllToiletComments" , controller.getToiletComments);
// router.get ("/getFindingsByPlaceType/:placeType" , controller.getFindingsByPlaceType);
router.get ("/getToiletCommentsByUserId/:userId", controller.getToiletCommentsByUserId);
router.delete("/deleteToiletComment/:toiletCommentId", controller.deleteToiletComment);
router.put("/updateToiletComment", controller.updateToiletComment);

module.exports = router;