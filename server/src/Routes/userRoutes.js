const express = require('express');
const router = express.Router();
const userController =require('../Controllers/userController');
const chanels =require('../Controllers/chanels');
const radios =require('../Controllers/radios');
const posts =require('../Controllers/posts');

router.post('/login',userController.login);
 router.get("/radios",radios.getRadios);
 router.get("/radios/:name",radios.getRadio);
 router.post("/radios",radios.addRadio);
 router.delete("/radios/:name",radios.deleteRadio);
 router.put("/radios/:name",radios.updateRadio);

 router.get("/chanels",chanels.getChanels);
 router.get("/chanels/:name",chanels.getChanel);
 router.post("/chanels",chanels.addChanel);
 router.delete("/chanels/:name",chanels.deleteChanel);
 router.put("/chanels/:name",chanels.updteChanel);
 
 router.get("/posts",posts.getPosts);
 router.get("/posts/:id",posts.getPost);
 router.post("/posts",posts.addPost);
 router.delete("/posts/:description",posts.deletePost);
 router.put("/posts/:id",posts.getPut);
 

module.exports=router;