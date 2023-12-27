var express = require('express');
var router = express.Router();
var DynamicModel;
const Owner=require("./users");
const passport= require('passport');
const localStrategy=require("passport-local");
const Doctor = require('./doctors');
const Patient = require('./patients');
passport.use(new localStrategy(Owner.authenticate()));
const hospital=mongoose.connect("mongodb://127.0.0.1:27017/Hospital-Database-2");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('hi');
});
router.post("/ownerregister",function(req,res,next){
  const {temp}=req.body.hospitalname;
  const ownerdata=new Owner({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    hospitalname: req.body.hospitalname,

  })
  const users = hospital.model(temp, {
    owner: Owner.schema,
    
   
  });
  users.register(ownerdata).then(function(registereduser){
    passport.authenticate("local")(req,res,function(){
      res.json("success");
    })
  })

  });
  router.post("/doctorregister",function(req,res,next){
    DynamicModel.findOne({ hospitalname: req.body.hospitalname }).then(owner=>{
      const userdata=new Doctor({
        name:req.body.name,
        email:req.body.email,
        speciality:req.body.speciality,
      });
      Doctor.register(userdata,req.body.password).then(function(registereduser){
        passport.authenticate("local")(req,res,function(){
          owner.doctors = userdata;
          res.send('success')})
      })
      });

    })
 
    router.post("/patientregister",function(req,res,next){
      DynamicModel.findOne({ hospitalname: req.body.hospitalname }).then(owner=>{
        const userdata=new Patient({
          name:req.body.name,
          email:req.body.email,
          age:req.body.age,
        })
        Doctor.register(userdata,req.body.password).then(function(registereduser){
          owner.patients=userdata;
          passport.authenticate("local")(req,res,function(){res.send('success')})
        })
        });
      })
      
 
  router.post("/login",(req,res,next)=>{
    const {email,password}=req.body;
    userModel.findOne({email:email}).then(
      user=>{
        if(user){
          if(user.password ===password)
          {
            res.json("success")
          }
          else{
            res.json("failure")
          }
        }
        else{
          res.json("no record")
        }
      }
    )
  })
  

module.exports = router;
