const express = require('express');
const router = express.Router();
const admin =require('../Controllers/admin');


router.get("/admin",admin.getAdmins);
router.get("/admin/:name",admin.getAdmin);
router.post("/admin",admin.addAdmin);
router.delete("/admin/:name",admin.deleteAdmin);
router.put("/admin/:id",admin.updateAdmin);
module.exports=router;