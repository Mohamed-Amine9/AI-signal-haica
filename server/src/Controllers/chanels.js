
const connection=require("../service/dbService");

//getAll chanels
exports.getChanels=(req,res)=>{
    const query = "SELECT * FROM chanels";
    connection.query(query, (err, rows) => {
      if (err) { 
        console.error(err.message);
        return res.status(500).send("Error occurred while fetching data.");
      }
      res.status(400).json(rows);
    })
  
   };  
//get chanel By Name method
exports.getChanel=(req,res)=>{
    const { name } = req.params;
    const query = "SELECT * FROM chanels where name=?";
    connection.query(query,[name], (err, rows) => {
      if (err) { 
        console.error(err.message);
        return res.status(500).send("Error occurred while fetching data.");
      }
      res.status(400).json(rows);
    })
  
   }; 
   exports.addChanel=(req,res)=>{
    const { name,description,url } = req.body;
 
    const sql = "INSERT INTO chanels (name,description,url) VALUES(?,?,?)";
    connection.query(sql, [name,description,url], (err, result) => {
      if (err) {
        console.error(err.message);
        return res.status(500).send("Error occurred while inserting data.");
      }
      res.send("Data inserted successfully.");
    });
};

exports.deleteChanel=(req,res)=>{
    const { name } = req.params;
    const sql = "DELETE FROM chanels WHERE name = ?";
    connection.query(sql, [name],(err, result) => {
        if (err) {
        console.error(err.message);
        return res.status(500).send("Error occurred while deleting data.");
        }
        if (result.affectedRows === 0) {
        return res.status(404).send("chanel not found.");
        }
        res.send("Data deleted successfully.");
        });
};

exports.updateChanel=(req, res) => {
  const { id } = req.params;
  const { name,description,url } = req.body;

  const sql = "UPDATE chanels SET description=? ,name=?,url=? where chanels_id=?";
  connection.query(sql, [name,description,url,id], (err, result) => {
    if (err) {
      console.error(err.message);
      return res.status(500).send("Error occurred while updating data.");
    }
    if (result.affectedRows === 0) {
      return res.status(404).send("Chanel not found.");
    }
    res.send("Data updated successfully.");
  });
};