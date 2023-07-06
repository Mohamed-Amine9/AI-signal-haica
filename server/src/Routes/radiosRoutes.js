const express = require('express');
const router = express.Router();
const path = require('path');
const radios = require(path.join(__dirname, '..', 'Controllers', 'radios'));
const requireAuth=require(path.join(__dirname,'..','middlware','auth'))



router.get('/addRadio',requireAuth.requireAuthAdmin, async (req, res) => {
    
  res.render('../views/index.ejs', { content: '../views/pages/addRadio&Chanel.ejs', data: admin,  userType: req.session.userType, status:{}
  });
});

router.get('/addChaine&Radio',requireAuth.requireAuthAdmin, async (req, res) => {

    //const admin = await central.getByEmail(email,'admin');
    
    res.render('../views/index.ejs', { content: '../views/pages/addRadio&Chanel.ejs', data: {},  userType: req.session.userType, status:{}
    });
  });

router.get('/radios',requireAuth.requireAuthAdmin, radios.getRadios);
router.get("/radios/:input",requireAuth.requireAuthAdmin,radios.getRadio);
router.post("/radios",requireAuth.requireAuthAdmin,radios.addRadio);
router.delete("/radios/:input",requireAuth.requireAuthAdmin,radios.deleteRadio);
router.put("/radios/:input",requireAuth.requireAuthAdmin,radios.updateRadio);
router.post("/start-recording", radios.startRecording);
router.post("/stop-recording", radios.stopRecording);
module.exports=router; 