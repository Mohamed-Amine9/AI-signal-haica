const express = require('express');
const router = express.Router();
const path = require('path');
const admin = require(path.join(__dirname, '..', 'Controllers', 'admin'));
const requireAuth=require(path.join(__dirname,'..','middlware','auth'));
const central = require(path.join(__dirname, '..', 'Controllers', 'centralController'));



router.get('/edit/:email',requireAuth.requireAuthSuperAdmin, async (req, res) => {
    const email = req.params.email;
    const admin = await central.getByEmail(email,'admin');
    
    res.render('../views/index.ejs', { content: '../views/pages/edit.ejs', data: admin,  userType: req.session.userType, status:{}
    });
  });
  


  router.get('/addAdmin',requireAuth.requireAuthSuperAdmin, async (req, res) => {

    //const admin = await central.getByEmail(email,'admin');
    
    res.render('../views/index.ejs', { content: '../views/pages/addAdmin.ejs', data: admin,  userType: req.session.userType, status:{}
    });
  });

  router.get('/addChaine&Radio',requireAuth.requireAuthAdmin, async (req, res) => {

    //const admin = await central.getByEmail(email,'admin');
    
    res.render('../views/index.ejs', { content: '../views/pages/addRadio&Chanel.ejs', data: admin,  userType: req.session.userType, status:{}
    });
  });

router.get("/admins", requireAuth.requireAuthSuperAdmin, admin.getAdmins);
router.get("/admins/:input",requireAuth.requireAuthSuperAdmin, admin.getAdmin);
router.post("/admins",requireAuth.requireAuthSuperAdmin,  admin.addAdmin);
router.delete("/admins/:input",requireAuth.requireAuthSuperAdmin,  admin.deleteAdmin);
router.put("/admin/:input",requireAuth.requireAuthSuperAdmin,  admin.updateAdmin);


  module.exports=router;