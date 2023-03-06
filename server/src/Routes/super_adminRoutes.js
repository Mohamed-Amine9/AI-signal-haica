const express = require('express');
const router = express.Router();
const path = require('path');
const super_admin = require(path.join(__dirname, '..', 'Controllers', 'super-admin'));


router.post("/super_admin",super_admin.addSuperAdmin);
router.post('/login',super_admin.login);
router.delete('/logout',super_admin.logOut);
module.exports=router;