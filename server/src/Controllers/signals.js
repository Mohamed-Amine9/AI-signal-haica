const path = require('path');
const connection = require(path.join(__dirname, '..', 'service', 'dbService'));
const central = require(path.join(__dirname, 'centralController'));
const {logs } = require(path.join(__dirname, '..', 'middlware', 'auth'));

const table={
name:"signals",
id:"signal_id"
};

exports.getSignals = async (req, res) => {
  try {
    const signals = await central.getAll(req, res, "signals");

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while fetching the signals' });
  }
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
      logs(req);
      res.send("Data inserted successfully.");
    });
};
exports.deleteSignal=(req,res)=>{
   central.deleteById(req,res,table.name,table.id);
  //res.redirect('/signals');
};