const express = require('express');
const router = express.Router();
const path = require('path');
const admin = require(path.join(__dirname, '..', 'Controllers', 'admin'));


router.get('/edit', (req, res) => {
    res.render('../views/index.ejs',{ content: '../views/pages/edit.ejs'});
});
router.get('/login', (req, res) => {
    res.render('../views/index.ejs',{ content: '../views/pages/login.ejs',data:{}});
});
router.get("/admins",admin.getAdmins);
router.get("/admins/:input",admin.getAdmin);
router.post("/admins",admin.addAdmin);
router.delete("/admins/:input",admin.deleteAdmin);
router.put("/admins/:input",admin.updateAdmin);
router.post("/login",admin.login)
router.delete("/logout/admin",admin.logOut)
module.exports=router;