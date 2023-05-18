const { json } = require('body-parser');
const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const connection = require(path.join(__dirname, '..', 'service', 'dbService'));
const central = require(path.join(__dirname, 'centralController'));
const {logs } = require(path.join(__dirname, '..', 'middlware', 'auth'));
const radios = require(path.join(__dirname, '..', 'Controllers', 'radios'));

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
      admin = await central.getByEmail(req, res, table.name);
    } else {
      admin = await central.getById(req, res, table.name, table.id);
    }

    // Render the layout with the admin.ejs content and pass the admin data
    res.render('../views/index.ejs', { content: 'pages/admins.ejs', admin });
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
        if (err) {
          console.error(err.message);
          return res.status(500).send("Error occurred while inserting data.");
        }
        logs(req);
        res.send("Data inserted successfully.");
      });
    })
    .catch(err => {
      console.error(err);
      return res.status(500).send("Error occurred while hashing the password.");
    });
};



exports.deleteAdmin=(req,res)=>{
  if(isNaN(req.params.input)){
    return central.deleteByEmail(req,res,table.name);
  }
    return central.deleteById(req,res,table.name,table.id);
};

exports.updateAdmin=(req, res) => {
    const { id } = req.params;
    const { firstName,lastName,email,password} = req.body;
  
    const sql = "UPDATE admins SET lastName=? ,firstName=?,email=? ,password=? where radios_id=?";
    connection.query(sql, [firstName,lastName,email,password,id], (err, result) => {
      if (err) {
        console.error(err.message);
        return res.status(500).send("Error occurred while updating data.");
      }
      if (result.affectedRows === 0) {
        return res.status(404).send("Admin not found.");
      }
      logs(req);
      res.send("Data updated successfully.");
    });
  };



  exports.login = async (req, res) => {
    try {
        logs(req);
        const tables = [
            { name: "admin", sessionId: "admin_id" },
            { name: "super_admin", sessionId: "super_admin_id" },
        ];
        const user = await central.loginUser(req, res, tables);
        if(user !== null) {
            await radios.getRadios(req, res);
        } else {
            throw new Error('Authentication failed');
        }
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
};
  
  
  exports.logOut=(req,res)=>{
    central.logOut(req,res,table.name,table.sessionId);
    logs(req);
  };
  