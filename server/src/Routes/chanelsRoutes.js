const express = require('express');
const router = express.Router();
const path = require('path');
const chanels = require(path.join(__dirname, '..', 'Controllers', 'chanels'));
const requireAuth=require(path.join(__dirname,'..','middlware','auth'))

router.get('/addChanel',requireAuth.requireAuthAdmin, async (req, res) => {

    //const admin = await central.getByEmail(email,'admin');
    
    res.render('../views/index.ejs', { content: '../views/pages/addChanel.ejs', data: {},  userType: req.session.userType, status:{}
    });
  });
router.get('/chanels',requireAuth.requireAuthAdmin,chanels.getChanels);
router.get("/chanels/:input",requireAuth.requireAuthAdmin,chanels.getChanel);
router.post("/chanels",requireAuth.requireAuthAdmin,chanels.addChanel);
router.delete("/chanels/:input",requireAuth.requireAuthAdmin,chanels.deleteChanel);
router.put("/chanels/:input",requireAuth.requireAuthAdmin,chanels.updateChanel);


module.exports=router;