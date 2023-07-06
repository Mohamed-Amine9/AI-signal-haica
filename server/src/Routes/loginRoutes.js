const express = require('express');
const router = express.Router();
const path = require('path');
const authentification = require(path.join(__dirname, '..', 'Controllers', 'login'));
const requireAuth=require(path.join(__dirname,'..','middlware','auth'))



router.post("/login", authentification.login);
router.get('/login', (req, res) => {
    res.render('../views/index.ejs',{ content: '../views/pages/login.ejs',data:{},userType: req.session.userType,status:{}});
});
router.get("/logout",  authentification.logOut)

  
module.exports=router;  