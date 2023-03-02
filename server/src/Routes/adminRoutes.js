const express = require('express');
const router = express.Router();
const admin =require('../Controllers/admin');


router.get("/admin",admin.getAdmins);
router.get("/admin/:input",admin.getAdmin);
router.post("/admin",admin.addAdmin);
router.delete("/admin/:input",admin.deleteAdmin);
router.put("/admin/:input",admin.updateAdmin);

module.exports=router;