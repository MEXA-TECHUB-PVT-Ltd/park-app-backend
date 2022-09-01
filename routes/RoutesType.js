const express = require("express"),
router=express.Router();

const controller = require("../controllers/RoutesTypeController")

router.post ("/createRouteType" ,controller.createRouteType);
router.get ("/getAllRoutesTypes" , controller.getRouteType);
router.delete("/deleteRouteTypes/:routeTypeId", controller.deleteRoutesTypes);
router.put ("/updateRouteType" , controller.updateRouteType);

module.exports = router;