const express = require('express');
const router = express.Router();
const path = require('path');
const posts = require(path.join(__dirname, '..', 'Controllers', 'posts'));


router.get("/posts",posts.getPosts);
router.get("/posts/:input",posts.getPost);
router.post("/posts",posts.addPost);
router.delete("/posts/:input",posts.deletePost);
router.put("/posts/:input",posts.updatePost);

module.exports=router;