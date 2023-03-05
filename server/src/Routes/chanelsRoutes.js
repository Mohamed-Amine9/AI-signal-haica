const express = require('express');
const router = express.Router();
const path = require('path');
const chanels = require(path.join(__dirname, '..', 'Controllers', 'chanels'));


router.get("/chanels",chanels.getChanels);
router.get("/chanels/:input",chanels.getChanel);
router.post("/chanels",chanels.addChanel);
router.delete("/chanels/:input",chanels.deleteChanel);
router.put("/chanels/:input",chanels.updateChanel);


module.exports=router;