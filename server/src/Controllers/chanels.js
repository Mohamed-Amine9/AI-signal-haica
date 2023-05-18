const path = require('path');
const connection = require(path.join(__dirname, '..', 'service', 'dbService'));
const central = require(path.join(__dirname, 'centralController'));
const {logs } = require(path.join(__dirname, '..', 'middlware', 'auth'));
const table={
  name:"chanel",
  id:"chanel_id"
}





//getAll chanels
exports.getChanels=async(req,res)=>{
  try {
    let chanels = await central.getAll(req, res, table.name);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while fetching the chanels' });
  }
   };  


//get chanel By Name method
exports.getChanel=(req,res)=>{
  if(isNaN(req.params.input)){
    return central.getByName(req,res,table.name);
  }
    return central.getById(req,res,table.name,table.id);
   }; 
exports.addChanel=(req,res)=>{
    const { name,description,url } = req.body;
 
    const sql = "INSERT INTO chanel (name,description,url) VALUES(?,?,?)";
    connection.query(sql, [name,description,url], (err, result) => {
      if (err) {
        console.error(err.message);
        return res.status(500).send("Error occurred while inserting data.");
      }
      logs(req);
      res.send("Data inserted successfully.");
    });
};

exports.deleteChanel=(req,res)=>{
  if(isNaN(req.params.input)){
    return central.deleteByName(req,res,table.name);
  }
 return central.deleteById(req,res,table.name,table.id);
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
    logs(req);
    res.send("Data updated successfully.");
  });
};