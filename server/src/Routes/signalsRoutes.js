const express = require('express');
const router = express.Router();
const signals =require('../Controllers/signals');

router.get("/signals",signals.getSignals);
router.get("/signals/:id",signals.getSignal);
router.post("/signals",signals.addSignal);
router.delete("/signals/:name",signals.deleteSignal);
//router.put("/signals/:id",signals.updateSignal);

module.exports=router;