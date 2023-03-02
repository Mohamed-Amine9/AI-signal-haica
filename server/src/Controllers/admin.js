const connection=require("../service/dbService");
const jwt=require('jsonwebtoken');
const bcrypt = require('bcrypt');
const central = require('./centralController');
const table={
  name:"admin",
  id:"admin_id"
};


exports.getAdmins=(req,res)=>{
  central.getAll(req,res,table.name);
};  



exports.getAdmin=(req,res)=>{
    if(isNaN(req.params.input)){
      return central.getByEmail(req,res,table.name);
    }
      return central.getById(req,res,table.name,table.id);
};  

exports.addAdmin=(req, res) => {
     const { firstName,lastName,email,password } = req.body;
     const sql = "INSERT INTO admin (firstName,lastName,email,password) VALUES (?,?,?,?)";
     connection.query(sql, [firstName,lastName,email,password], (err, result) => {
       if (err) {
         console.error(err.message);
         return res.status(500).send("Error occurred while inserting data.");
       }
       res.send("Data inserted successfully.");
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
      res.send("Data updated successfully.");
    });
  };