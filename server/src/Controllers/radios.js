const connection=require("../service/dbService")
const central = require('./centralController');
const message=require("../config/messages")

const table = {
  name:"radio",
  id:"radio_id"
}


//getAll method
exports.getRadios=(req,res)=>{
  central.getAll(req,res,table.name);
  
   };  
   
//get By Name method
exports.getRadio=(req,res)=>{
  if(isNaN(req.params.input)===false){
    return central.getById(req,res,table.name,table.id);
  }
    return central.getByName(req,res,table.name);
   };  


exports.addRadio=(req,res)=>{
    const { name,description,url } = req.body;
 
    const sql = "INSERT INTO radio (name,description,url) VALUES(?,?,?)";
    connection.query(sql, [name,description,url], (err, result) => {
      if (err) {
        console.error(err.message);
        return res.status(500).send(message.error.serverError);
      }
      res.send(message.success.create);
    });
};

exports.deleteRadio=(req,res)=>{
  
  if(isNaN(req.params.input)===false){
    console.log(table.id)
  return central.deleteById(req,res,table.name,table.id);
  }
  return central.deleteByName(req,res,table.name);
  
};

exports.updateRadio=(req, res) => {
  const { id } = req.params;
  const { name,description,url } = req.body;

  const sql = "UPDATE radio SET description=? ,name=?,url=? where radios_id=?";
  connection.query(sql, [name,description,url,id], (err, result) => {
    if (err) {
      console.error(err.message);
      return res.status(500).send(message.error.serverError);
    }
    if (result.affectedRows === 0) {
      return res.status(404).send(message.error.notFound+" "+table);
    }
    res.send(message.success.update);
  });
};