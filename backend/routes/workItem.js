const express = require('express');

const workItemController = require('../controllers/workItem');

const router = express.Router();

router.get('/workItems', workItemController.getWorkItems);

router.get('/workItem/:id', workItemController.getWorkItem);

module.exports = router;
