const connection=require("../service/dbService");
const jwt=require('jsonwebtoken');
const bcrypt = require('bcrypt');
const centralController = require('./centralController');
const table="admins";


exports.getAdmins=(req,res)=>{
    
  centralController.getAll(red,res,table);
   };  

   
   exports.getAdmin=(req,res)=>{
    const { name } = req.params;
    const query = "SELECT * FROM admins where name=?";
    connection.query(query,[name], (err, rows) => {
      if (err) { 
        console.error(err.message);
        return res.status(500).send("Error occurred while fetching data.");
      }
      res.status(400).json(rows);
    })
  
   };  
exports.addAdmin=(req, res) => {
     const { firstName,lastName,email,password } = req.body;
 
     const sql = "INSERT INTO users (firstName,lastName,email,password) VALUES (?,?,?,?)";
     connection.query(sql, [firstName,lastName,email,password], (err, result) => {
       if (err) {
         console.error(err.message);
         return res.status(500).send("Error occurred while inserting data.");
       }
       res.send("Data inserted successfully.");
     });
   };


   exports.deleteAdmin=(req,res)=>{
    const { name } = req.params;
    const sql = "DELETE FROM admins WHERE name = ?";
    connection.query(sql, [name],(err, result) => {
        if (err) {
        console.error(err.message);
        return res.status(500).send("Error occurred while deleting data.");
        }
        if (result.affectedRows === 0) {
        return res.status(404).send("Admin not found.");
        }
        res.send("Data deleted successfully.");
        });
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