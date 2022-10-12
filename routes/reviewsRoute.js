
const express = require("express"),
router=express.Router();

const controller = require("../controllers/reviewController")

router.post ("/createReview" ,controller.createReview);
router.get ("/getAllReviews" , controller.getAllReviews);
router.get ("/getReviewsByUserId/:user_id" , controller.getReviewsByUserId);
router.delete("/deleteReview/:review_id", controller.deleteReview);
router.put ("/updateReview" , controller.updateReview);
module.exports = router;