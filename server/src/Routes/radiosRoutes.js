const express = require('express');
const router = express.Router();
const path = require('path');
const radios = require(path.join(__dirname, '..', 'Controllers', 'radios'));


router.get("/radios",radios.getRadios);
router.get("/radios/:input",radios.getRadio);
router.post("/radios",radios.addRadio);
router.delete("/radios/:input",radios.deleteRadio);
router.put("/radios/:input",radios.updateRadio);

module.exports=router;