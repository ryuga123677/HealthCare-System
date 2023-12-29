var express = require('express');
var router = express.Router();
const Owner=require("./users");
const passport= require('passport');
const localStrategy=require("passport-local");
const Doctor = require('./doctors');
const Patient = require('./patients');
passport.use(new localStrategy(Owner.authenticate()));
passport.use('doctor', new localStrategy(Doctor.authenticate()));


/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('hi');
});
router.post("/ownerregister",function(req,res,next){
 
  const ownerdata=new Owner({
    username: req.body.username,
    email: req.body.email,
    hospitalname: req.body.hospitalname,
    

  })
  
  Owner.register(ownerdata,req.body.password).then(function(registereduser){
    passport.authenticate("local")(req,res,function(){
      console.log(res.json);
      res.send("success");
    })
  })

  });
  router.post("/ownerlogin",passport.authenticate("local",{
  
    failureFlash:true,
  }),function(req,res){
    res.json("success");
  
  });
  router.post('/doctorregister',async function(req, res, next) {

    const user=await Owner.findOne({hospitalname:req.body.hospitalname});
   const  doct= await Doctor.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    specialty: req.body.specialty,
      hospitalname:user._id
    });
    user.doctors.push(doct._id);
    await user.save();
    res.send("success");
  
  });
 router.post("/doctorlogin",(req,res,next)=>{
    const {username,password}=req.body;
    Doctor.findOne({username:username}).then(
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
  });
  router.get("/doctorlist",async (req,res,next)=>{
    const hospitalname=req.query.search;
  const user= await Owner.findOne({hospitalname:hospitalname}).populate("doctors");

      res.send(user.doctors);
      console.log(user.doctors);
    
  });
  
  router.post('/patientregister',async function(req, res, next) {

    const user=await Owner.findOne({hospitalname:req.body.hospitalname});
   const  pet= await Patient.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    age: req.body.age,
      hospitalname:user._id
    });
    user.patients.push(pet._id);
    await user.save();
    res.send("success");
  
  });
  router.post("/patientlogin",(req,res,next)=>{
    const {username,password}=req.body;
    Patient.findOne({username:username}).then(
      user=>{
        if(user){
          if(user.password ===password)
          {
            res.json(
              "success",
      
            )
          }
          else{
            res.json(
              "failure",
             )
          }
        }
        else{
          res.json(
            "no record",
        
          )
        }
      }
    )
  });
  
  //   router.post("/patientregister",function(req,res,next){
  //     DynamicModel.findOne({ hospitalname: req.body.hospitalname }).then(owner=>{
  //       const userdata=new Patient({
  //         name:req.body.name,
  //         email:req.body.email,
  //         age:req.body.age,
  //       })
  //       Doctor.register(userdata,req.body.password).then(function(registereduser){
  //         owner.patients=userdata;
  //         passport.authenticate("local")(req,res,function(){res.send('success')})
  //       })
  //       });
  //     })
      
 
  // router.post("/login",(req,res,next)=>{
  //   const {email,password}=req.body;
  //   userModel.findOne({email:email}).then(
  //     user=>{
  //       if(user){
  //         if(user.password ===password)
  //         {
  //           res.json("success")
  //         }
  //         else{
  //           res.json("failure")
  //         }
  //       }
  //       else{
  //         res.json("no record")
  //       }
  //     }
  //   )
  // })
  

module.exports = router;
