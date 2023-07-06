const path = require('path');
const bcrypt = require('bcrypt');
const connection = require(path.join(__dirname, '..', 'service', 'dbService'));
const {logs } = require(path.join(__dirname, '..', 'middlware', 'auth'));
const central = require(path.join(__dirname, 'centralController'));
//const cental=require('./centralController')

const table={
name:"super_admin",
session:"super_admin_id"
}
exports.addSuperAdmin=(req,res)=>{
    const { firstName, lastName, email, password } = req.body;
  bcrypt.hash(password, 10)
    .then(hashedPassword => {
      const sql = "INSERT INTO super_admin (firstName, lastName, email, password) VALUES (?,?,?,?)";
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



exports.logOut=(req,res)=>{
  central.logOut(req,res,table.name,table.session);
  logs(req);
};