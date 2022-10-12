

const express = require("express"),
router=express.Router();

const controller = require("../controllers/locationController")

router.post ("/createLocation" ,controller.createLocations);
router.get ("/getAllLocations" , controller.getLocations);
router.delete("/deleteLocation/:location_id", controller.deleteLocation);
router.put ("/updateLocation" , controller.updateLocation);
router.get("/getLocationByType" , controller.getLocationByType)

module.exports = router;