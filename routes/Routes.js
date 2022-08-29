const express = require("express"),
router=express.Router();

const controller = require("../controllers/RoutesController")

router.post ("/createRoute" ,controller.createRoutes);
router.get ("/getRoutes" , controller.getRoutes);
router.get ("/getRouteByRouteTypeId/:routeTypeId" , controller.getRouteByRouteTypeId);
router.delete("/deleteRoute/:routeId", controller.deleteRoutes);
router.put ("/updateRoute" , controller.updateRoute);

module.exports = router;