const connection=require("../service/dbService");
const central = require('./centralController');
const table = {
  name:"post",
  id:"post_id"
}
exports.getPosts=(req,res)=>{
   central.getAll(req,res,table.name);
   };  

   exports.getPost=(req,res)=>{
    if(isNaN(req.params.input)===false){
      return central.getById(req,res,table.name,table.id);
    }
      return central.getByName(req,res,table.name);
   };

   exports.addPost=(req,res)=>{
    const { name,description,imageUrl,videoUrl } = req.body;
 
    const sql = "INSERT INTO post (name,description,imageUrl,videoUrl) VALUES(?,?,?,?)";
    connection.query(sql, [name,description,imageUrl,videoUrl], (err, result) => {
      if (err) {
        console.error(err.message);
        return res.status(500).send("Error occurred while inserting data.");
      }
      res.send("Data inserted successfully.");
    });
};
exports.deletePost=(req,res)=>{
    const { description } = req.params;
    const sql = "DELETE FROM posts WHERE description= ?";
    connection.query(sql, [description],(err, result) => {
        if (err) {
        console.error(err.message);
        return res.status(500).send("Error occurred while deleting data.");
        }
        if (result.affectedRows === 0) {
        return res.status(404).send("post not found.");
        }
        res.send("Data deleted successfully.");
        });
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
    res.send("Data updated successfully.");
  });
};