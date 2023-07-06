const express = require('express');
const router = express.Router();
const path = require('path');
const super_admin = require(path.join(__dirname, '..', 'Controllers', 'super-admin'));


router.post("/super_admin",super_admin.addSuperAdmin);

module.exports=router;