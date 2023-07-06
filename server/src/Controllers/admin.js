const { json } = require('body-parser');
const path = require('path');
const bcrypt = require('bcrypt');
const { query } = require('express');
const connection = require(path.join(__dirname, '..', 'service', 'dbService'));
const central = require(path.join(__dirname, 'centralController'));
const {logs } = require(path.join(__dirname, '..', 'middlware', 'auth'));


const table={
  name:"admin",
  sessionId:"admin_id"
};


exports.getAdmins=async(req,res)=>{
  try{
    let admins;
  
    admins= await central.getAll(req,res,table.name);

  }catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while fetching the admins' });
  }
};  

exports.getAdmin = async (req, res) => {
  try {
    let admin;
    if (isNaN(req.params.input)) {
      admin = await central.getByEmail(email,table.name);
    } else {
      admin = await central.getById(req, res, table.name, table.id);
    }

    // Render the layout with the admin.ejs content and pass the admin data
    res.render('../views/index.ejs', { content: 'pages/admins.ejs', admin,userType: req.session.userType });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while fetching the admin' });
  }
};


exports.addAdmin=(req, res) => {
  const { firstName, lastName, email, password } = req.body;
  bcrypt.hash(password, 10)
    .then(hashedPassword => {
      const sql = "INSERT INTO admin (firstName, lastName, email, password) VALUES (?,?,?,?)";
      connection.query(sql, [firstName, lastName, email, hashedPassword], (err, result) => {
        console.log('--------------------------+++++++++++++++'+email)
        if (err) {
          console.error(err.message);
          return res.status(500).send("Error occurred while inserting data.");
        }
        logs(req);
        res.redirect('/admins');
      });
    })
    .catch(err => {
      console.error(err);
      return res.status(500).send("Error occurred while hashing the password.");
    });
};



exports.deleteAdmin=async(req,res)=>{
 try {
  const deleteAdmin=await central.deleteByEmail(req,res,table.name);
 } catch (err) {
  console.error(err);
  res.status(500).json({ error: 'An error occurred while deleting the admin' });
 }

};

exports.updateAdmin=(req, res) => {
    const { input } = req.params;
    const { firstName,lastName,email,role} = req.body;
    const sql = "UPDATE admin SET lastName=? ,firstName=?,email=?,role=? where email=?";
    connection.query(sql, [firstName,lastName,email,role,input], (err, result) => {
      console.log("------------"+result)
      if (err) {
        console.error(err.message);
        return res.status(500).send("Error occurred while updating data.");
      }
      if (result.affectedRows === 0) {
        return res.status(404).send("Admin not found.");
      }
      logs(req);
      res.redirect("/admins"); 
    });
  };




