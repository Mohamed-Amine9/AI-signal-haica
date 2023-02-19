const express = require('express');
const router = express.Router();
const radios =require('../Controllers/radios');

router.get("/radios",radios.getRadios);
router.get("/radios/:name",radios.getRadio);
router.post("/radios",radios.addRadio);
router.delete("/radios/:name",radios.deleteRadio);
router.put("/radios/:id",radios.updateRadio);

module.exports=router;