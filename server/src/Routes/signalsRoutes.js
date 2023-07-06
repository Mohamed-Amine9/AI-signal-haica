const express = require('express');
const router = express.Router();
const path = require('path');
const signals = require(path.join(__dirname, '..', 'Controllers', 'signals'));
const requireAuth=require(path.join(__dirname,'..','middlware','auth'))


router.get("/signals",requireAuth.requireAuthSuperAdmin,signals.getSignals);
router.get("/signals/:input",signals.getSignal);
router.post("/signals",signals.addSignal);
router.delete("/signals/:input",signals.deleteSignal);
//router.put("/signals/:id",signals.updateSignal);

module.exports=router;