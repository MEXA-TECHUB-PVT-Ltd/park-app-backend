

const express = require("express"),
router=express.Router();

const controller = require("../controllers/LocationTypeController")

router.post ("/createLocationType" ,controller.createLocationType);
router.get ("/getAllLocationTypes" , controller.getLocationType);
router.delete("/deleteLocationType/:locationTypeId", controller.deleteLocationType);
router.put ("/updateLocationType" , controller.updateLocationType);

module.exports = router;