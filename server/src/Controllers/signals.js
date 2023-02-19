const connection=require("../service/dbService");

exports.getSignals=(req,res)=>{
    const query = "SELECT * FROM signals";
    connection.query(query, (err, rows) => {
      if (err) { 
        console.error(err.message);
        return res.status(500).send("Error occurred while fetching data.");
      }
      res.status(400).json(rows);
    })
  
   };  
   

   exports.getSignal=(req,res)=>{
    const { id } = req.params;
    const query = "SELECT * FROM signals where signals_id=?";
    connection.query(query,[id], (err, rows) => {
      if (err) { 
        console.error(err.message);
        return res.status(500).send("Error occurred while fetching data.");
      }
      res.status(400).json(rows);
    })
  
   };  

   exports.addSignal=(req,res)=>{
    const { date,description } = req.body;
 
    const sql = "INSERT INTO signals (date,description) VALUES(?,?)";
    connection.query(sql, [date,description], (err, result) => {
      if (err) {
        console.error(err.message);
        return res.status(500).send("Error occurred while inserting data.");
      }
      res.send("Data inserted successfully.");
    });
};
exports.deleteSignal=(req,res)=>{
    const { id } = req.params;
    const sql = "DELETE FROM signals WHERE signals_id = ?";
    connection.query(sql, [id],(err, result) => {
        if (err) {
        console.error(err.message);
        return res.status(500).send("Error occurred while deleting data.");
        }
        if (result.affectedRows === 0) {
        return res.status(404).send("Signal not found.");
        }
        res.send("Data deleted successfully.");
        });
};