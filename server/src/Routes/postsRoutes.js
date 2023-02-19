const express = require('express');
const router = express.Router();
const posts =require('../Controllers/posts');

router.get("/posts",posts.getPosts);
router.get("/posts/:id",posts.getPost);
router.post("/posts",posts.addPost);
router.delete("/posts/:description",posts.deletePost);
router.put("/posts/:id",posts.updatePost);

module.exports=router;