const express = require("express"),
router=express.Router();

const controller = require("../controllers/savedRoutesController")

router.post ("/createSavedRoutes" ,controller.createSaveRoute);
router.get ("/getAllSavedRoutes" , controller.getSavedRoutes);
router.get ("/getSavedRoutesByUserId/:userId", controller.getSavedRoutesByUserId);
router.delete("/deleteSavedRoute/:savedRoutesId", controller.deleteSavedRoutes);
router.put ("/updateSavesRoute" , controller.updateSavedRoute);

module.exports = router;