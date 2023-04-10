const express = require("express");

const workItemController = require("../controllers/workItem");

const router = express.Router();

router.get("/workitems", workItemController.getWorkItems);

router.get("/workitem/:id", workItemController.getWorkItem);

router.get("/workitems/industries", workItemController.getIndustries);

router.get("/workitems/services", workItemController.getServices);

router.get("/workitems/service/:service", workItemController.getService);

router.get("/workitems/industry/:industry", workItemController.getIndustry);

module.exports = router;
