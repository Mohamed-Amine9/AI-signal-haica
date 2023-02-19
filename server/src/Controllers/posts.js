const connection=require("../service/dbService");

exports.getPosts=(req,res)=>{
    const query = "SELECT * FROM posts";
    connection.query(query, (err, rows) => {
      if (err) { 
        console.error(err.message);
        return res.status(500).send("Error occurred while fetching data.");
      }
      res.status(400).json(rows);
    })
  
   };  

   exports.getPost=(req,res)=>{
    const { id } = req.params;
    const query = "SELECT * FROM posts where id=?";
    connection.query(query,[id], (err, rows) => {
      if (err) { 
        console.error(err.message);
        return res.status(500).send("Error occurred while fetching data.");
      }
      res.status(400).json(rows);
    })
  
   };

   exports.addPost=(req,res)=>{
    const { name,description,imageUrl,videoUrl } = req.body;
 
    const sql = "INSERT INTO posts (name,description,imageUrl,videoUrl) VALUES(?,?,?,?)";
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