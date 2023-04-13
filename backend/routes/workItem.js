const express = require("express");

const workItemController = require("../controllers/workItem");

const router = express.Router();

router.get("/workitems", workItemController.getWorkItems);

router.get("/workitem/:id", workItemController.getWorkItem);

router.get("/industries", workItemController.getIndustries);

router.get("/services", workItemController.getServices);

router.get("/service/:service", workItemController.getService);

router.get("/industry/:industry", workItemController.getIndustry);

module.exports = router;
