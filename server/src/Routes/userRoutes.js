const express = require('express');
const router = express.Router();
const path = require('path');
const userController = require(path.join(__dirname, '..', 'Controllers', 'userController'));


router.post('/login',userController.login);
router.delete('/logout',userController.logOut);

module.exports=router;