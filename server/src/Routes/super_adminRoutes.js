const express = require('express');
const router = express.Router();
const super_admin =require('../Controllers/super-admin');

router.post("/super_admin",super_admin.addSuperAdmin);
module.exports=router;