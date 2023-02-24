const express = require('express');
const router = express.Router();
const chanels =require('../Controllers/chanels');


router.get("/chanels",chanels.getChanels);
router.get("/chanels/:name",chanels.getChanel);
router.post("/chanels",chanels.addChanel);
router.delete("/chanels/:name",chanels.deleteChanel);
router.put("/chanels/:name",chanels.updateChanel);


module.exports=router;