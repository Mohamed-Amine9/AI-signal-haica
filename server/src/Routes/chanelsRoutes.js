const express = require('express');
const router = express.Router();
const chanels =require('../Controllers/chanels');


router.get("/chanels",chanels.getChanels);
router.get("/chanels/:input",chanels.getChanel);
router.post("/chanels",chanels.addChanel);
router.delete("/chanels/:input",chanels.deleteChanel);
router.put("/chanels/:input",chanels.updateChanel);


module.exports=router;