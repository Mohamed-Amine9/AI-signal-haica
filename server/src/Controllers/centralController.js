const connection=require("../service/dbService");
const message=require("../config/messages")


exports.getAll = (req, res, table) => {
    const query = "SELECT * FROM " + table;
    connection.query(query, (err, rows) => {
      if (err) { 
        console.error(err.message);
        return res.status(500).send(message.error.serverError);
      }
      if (!rows) {
        console.error(message.error.notFound+" "+ table);
        return res.status(404).send(message.error.notFound);
      }
      res.status(200).json(rows);
    })
  };



  exports.getById=(req,res,table,Id)=>{
    const { id } = req.params;
    
    const query = "SELECT * FROM "+table+" where "+Id+"=?";
   
    connection.query(query,[id], (err, rows) => {
      if (err) { 
        console.error(err.message);
        return res.status(500).send(message.error.serverError);
      }
      res.status(400).json(rows);
    })
};



exports.getByName=(req,res,table)=>{
    const { name } = req.params;
    const query = "SELECT * FROM "+table+" where name=?";
    connection.query(query,[name], (err, rows) => {
      if (err) { 
        console.error(err.message);
        return res.status(500).send(message.error.serverError);
      }
      res.status(400).json(rows);
    })
};

exports.deleteByName=(req,res,table)=>{

    const { input } = req.params;
    const sql = "DELETE FROM "+table+" WHERE name = ?";
    connection.query(sql, [input],(err, result) => {
        if (err) {
        console.error(err.message);
        return res.status(500).send(message.error.serverError);
        }
        if (result.affectedRows === 0) {
        return res.status(404).send(message.error.notFound+" "+table);
        }
        res.send(message.success.delete);
        });
};


exports.deleteById=(req,res,table,Id)=>{
    
    const { input } = req.params;
    const sql = "DELETE FROM "+table+" WHERE "+Id+"= ?";
    connection.query(sql, [input],(err, result) => {
        if (err) {
        console.error(err.message);
        return res.status(500).send(message.error.serverError);
        }
        if (result.affectedRows === 0) {
        return res.status(404).send(message.error.notFound+" "+table);
        }
        res.send(message.success.delete);
        });
};
