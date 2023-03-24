const path = require('path');

const connection = require(path.join(__dirname, '..', 'service', 'dbService'));
const central = require(path.join(__dirname, 'centralController'));
const {logs } = require(path.join(__dirname, '..', 'middlware', 'auth'));
const message = require(path.join(__dirname, '..', 'config', 'messages'));
const table = {
  name:"radio",
  id:"radio_id"
}
const redirect=require('../middlware/auth');

//getAll method
exports.getRadios=(req,res)=>{
 // redirect.requireSession(req,res);
  central.getAll(req,res,table.name);
  
   };  
   
//get By Name method
exports.getRadio=(req,res)=>{
  if(isNaN(req.params.input)){
    return central.getByName(req,res,table.name);
  }
    return central.getById(req,res,table.name,table.id);
};  


exports.addRadio=(req,res)=>{
    const { name,description,url } = req.body;
 
    const sql = "INSERT INTO radio (name,description,url) VALUES(?,?,?)";
    connection.query(sql, [name,description,url], (err, result) => {
      if (err) {
        console.error(err.message);
        return res.status(500).send(message.error.serverError);
      }
      logs(req);
      res.send(message.success.create);
    });
};

exports.deleteRadio=(req,res)=>{
  
  if(isNaN(req.params.input)){
    return central.deleteByName(req,res,table.name);
  }
  logs(req);
 return central.deleteById(req,res,table.name,table.id);
  
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
    logs(req);
    res.send(message.success.update);
  });
};