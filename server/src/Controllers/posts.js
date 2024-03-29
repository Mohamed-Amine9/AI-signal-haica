const path = require('path');
const connection = require(path.join(__dirname, '..', 'service', 'dbService'));
const central = require(path.join(__dirname, 'centralController'));
const log = require(path.join(__dirname, '..', 'log', 'logger'));
const message = require(path.join(__dirname, '..', 'config', 'messages'));
const {logs } = require(path.join(__dirname, '..', 'middlware', 'auth'));
const table = {
  name:"post",
  id:"post_id"
}


exports.getPosts=(req,res)=>{
    central.getAll(req,res,table.name);
};  


exports.getPost=(req,res)=>{
  if(isNaN(req.params.input)){
    return central.getByName(req,res,table.name);
  }
    return central.getById(req,res,table.name,table.id);
};

  
exports.addPost=(req,res)=>{
    const { name,description,imageUrl,videoUrl } = req.body;
    const sql = "INSERT INTO post (name,description,imageUrl,videoUrl) VALUES(?,?,?,?)";
    connection.query(sql, [name,description,imageUrl,videoUrl], (err, result) => {
      if (err) {
        console.error(err.message);
        return res.status(500).send("Error occurred while inserting data.");
      }
      logs(req);
      res.send("Data inserted successfully.");
    });
};

exports.deletePost=(req,res)=>{
  if(isNaN(req.params.input)){
    return central.deleteByName(req,res,table.name);
  }
    return central.deleteById(req,res,table.name,table.id);
  
};

exports.updatePost=(req, res) => {
  const { id } = req.params;
  const { description,imageUrl,videoUrl } = req.body;

  const sql = "UPDATE posts SET description=? ,imageUrl=?,videoUrl=? where posts_id=?";
  connection.query(sql, [description,imageUrl,videoUrl, id], (err, result) => {
    if (err) {
      console.error(err.message);
      return res.status(500).send("Error occurred while updating data.");
    }
    if (result.affectedRows === 0) {
      return res.status(404).send("Post not found.");
    }
    logs(req);
    res.send("Data updated successfully.");
  });
};