const connection=require("../service/dbService");

//getAll method
exports.getRadios=(req,res)=>{
    const query = "SELECT * FROM radios";
    connection.query(query, (err, rows) => {
      if (err) { 
        console.error(err.message);
        return res.status(500).send("Error occurred while fetching data.");
      }
      res.status(400).json(rows);
    })
  
   };  
   
//get By Name method
exports.getRadio=(req,res)=>{
    const { name } = req.params;
    const query = "SELECT * FROM radios where name=?";
    connection.query(query,[name], (err, rows) => {
      if (err) { 
        console.error(err.message);
        return res.status(500).send("Error occurred while fetching data.");
      }
      res.status(400).json(rows);
    })
  
   };  
   exports.addRadio=(req,res)=>{
    const { name,description,url } = req.body;
 
    const sql = "INSERT INTO radios (name,description,url) VALUES(?,?,?)";
    connection.query(sql, [name,description,url], (err, result) => {
      if (err) {
        console.error(err.message);
        return res.status(500).send("Error occurred while inserting data.");
      }
      res.send("Data inserted successfully.");
    });
};

exports.deleteRadio=(req,res)=>{
    const { name } = req.params;
    const sql = "DELETE FROM radios WHERE name = ?";
    connection.query(sql, [name],(err, result) => {
        if (err) {
        console.error(err.message);
        return res.status(500).send("Error occurred while deleting data.");
        }
        if (result.affectedRows === 0) {
        return res.status(404).send("Radio not found.");
        }
        res.send("Data deleted successfully.");
        });
};