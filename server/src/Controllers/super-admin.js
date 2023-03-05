const path = require('path');
const connection = require(path.join(__dirname, '..', 'service', 'dbService'));
const log = require(path.join(__dirname, '..', 'log', 'logger'));



exports.addSuperAdmin=(req,res)=>{
    const { firstName,lastName,role,email,password  } = req.body;
 
    const sql = "INSERT INTO super_admin (firstName,lastName,email,password ) VALUES(?,?,?,?)";
    connection.query(sql, [firstName,lastName,role,email,password ], (err, result) => {
      if (err) {
        console.error(err.message);
        return res.status(500).send("Error occurred while inserting data.");
      }
      log.info(`[${req.method} ${req.url}]`);
      res.send("Data inserted successfully.");
    });
};