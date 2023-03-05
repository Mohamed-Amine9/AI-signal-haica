const path = require('path');
const connection = require(path.join(__dirname, '..', 'service', 'dbService'));
const central = require(path.join(__dirname, 'centralController'));
const log = require(path.join(__dirname, '..', 'log', 'logger'));

const table={
name:"signals",
id:"signal_id"
};

exports.getSignals=(req,res)=>{
  central.getAll(req,res,table.name);
};  

exports.getSignal=(req,res)=>{
    return central.getById(req,res,table.name,table.id);
};


exports.addSignal=(req,res)=>{
    const { date,description } = req.body;
    const sql = "INSERT INTO signals (date,description) VALUES(?,?)";
    connection.query(sql, [date,description], (err, result) => {
      if (err) {
        console.error(err.message);
        return res.status(500).send("Error occurred while inserting data.");
      }
      log.info(`[${req.method} ${req.url}]`);
      res.send("Data inserted successfully.");
    });
};
exports.deleteSignal=(req,res)=>{
   central.deleteById(req,res,table.name,table.id);
};