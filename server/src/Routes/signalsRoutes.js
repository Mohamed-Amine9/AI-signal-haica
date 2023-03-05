const express = require('express');
const router = express.Router();
const path = require('path');
const signals = require(path.join(__dirname, '..', 'Controllers', 'signals'));


router.get("/signals",signals.getSignals);
router.get("/signals/:input",signals.getSignal);
router.post("/signals",signals.addSignal);
router.delete("/signals/:input",signals.deleteSignal);
//router.put("/signals/:id",signals.updateSignal);

module.exports=router;