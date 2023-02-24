const connection=require("../service/dbService");
const centralController = require('./centralController');
const table="super_admin";

exports.addSuperAdmin=(req,res)=>{
    const { firstName,lastName,role,email,password  } = req.body;
 
    const sql = "INSERT INTO super_admin (firstName,lastName,email,password ) VALUES(?,?,?,?)";
    connection.query(sql, [firstName,lastName,role,email,password ], (err, result) => {
      if (err) {
        console.error(err.message);
        return res.status(500).send("Error occurred while inserting data.");
      }
      res.send("Data inserted successfully.");
    });
};