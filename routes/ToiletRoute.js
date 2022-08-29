
const express = require("express"),
router=express.Router();

const controller = require("../controllers/toiletController")

router.post ("/createToilet" ,controller.createToilet);
router.get ("/getToilets" , controller.getToilets);
router.delete("/removeToilet/:toiletId", controller.removeToilet);
router.put ("/updateToiletDetails" , controller.updateToiletDetails);

module.exports = router;