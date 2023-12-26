var express = require('express');
var router = express.Router();
const userModel=require("./users");
const passport= require('passport');
const localStrategy=require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('hi');
});
router.post("/register",function(req,res,next){
  const userdata=new userModel({
    username:req.body.username,
    email:req.body.email,
    fullname:req.body.fullname,
  })
  userModel.register(userdata,req.body.password).then(function(registereduser){
    passport.authenticate("local")(req,res,function(){})
  })
  });
  router.post("/login",passport.authenticate("local",{
    successRedirect:"/profile",
    failureRedirect:"/login",
    failureFlash:true,
  }),function(req,res){
  
  });

module.exports = router;
