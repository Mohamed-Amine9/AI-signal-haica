const path = require('path');
const connection = require(path.join(__dirname, '..', 'service', 'dbService'));
const {logs } = require(path.join(__dirname, '..', 'middlware', 'auth'));
const central = require(path.join(__dirname, 'centralController'));
//const cental=require('./centralController')

const table={
name:"super_admin",
session:"super_admin_id"
}
exports.addSuperAdmin=(req,res)=>{
    const { firstName,lastName,role,email,password  } = req.body;
 
    const sql = "INSERT INTO super_admin (firstName,lastName,email,password ) VALUES(?,?,?,?)";
    connection.query(sql, [firstName,lastName,email,password ], (err, result) => {
      if (err) {
        console.error(err.message);
        return res.status(500).send("Error occurred while inserting data.");
      }
      logs(req);
      res.send("Data inserted successfully.");
    });
};

exports.login= async(req,res)=>{
  try {
    logs(req);
    const t = await central.loginUser(req,res,table.name,table.session);
    res.json(t)

  } catch (error) {
    res.json(error)
  }
};

exports.logOut=(req,res)=>{
  central.logOut(req,res,table.name,table.session);
  logs(req);
};