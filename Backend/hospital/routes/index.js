var express = require('express');
var router = express.Router();
const Owner=require("./users");
const passport= require('passport');
const localStrategy=require("passport-local");
const Doctor = require('./doctors');
const Patient = require('./patients');
passport.use('owner-local',new localStrategy(Owner.authenticate()));
passport.use('doctor-local', new localStrategy(Doctor.authenticate()));
passport.use('patient-local', new localStrategy(Patient.authenticate()));


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
    passport.authenticate("owner-local")(req,res,function(){
      console.log(res.json);
      res.send("success");
    })
  })

  });
  router.post("/ownerlogin",passport.authenticate("owner-local",{
  
    failureFlash:true,
  }),function(req,res){
    res.json("success");
  
  });

  router.post('/doctorregister',async function(req, res, next) {

    const user=await Owner.findOne({hospitalname:req.body.hospitalname});
   const  doct= new Doctor({
    username: req.body.username,
    email: req.body.email,
    
    specialty: req.body.specialty,
      hospitalname:user.hospitalname,
    });
    Doctor.register(doct,req.body.password,).then(function(registered) {    passport.authenticate("doctor-local")(req,res,function(){
      // console.log(res.json);
      res.send("success");
    })

    })
    user.doctors.push(doct._id);
    await user.save();
    // res.send("success");
  
  });
  router.post("/doctorlogin",passport.authenticate("doctor-local",{
  
    failureFlash:true,
  }),function(req,res){
    res.json("success");
  
  });

  router.get("/doctorlist",async (req,res,next)=>{
    const hospitalname=req.query.search;
  const user= await Owner.findOne({hospitalname:hospitalname}).populate("doctors");

      res.send(user.doctors);
      console.log(user);
    
    
  });
  
  router.get("/appointment",async (req,res,next)=>{
    const patient=await Patient.findOne({username:req.query.param2});
  const doctor=await Doctor.findOne({username:req.query.param1});

  doctor.appointments.push(patient._id);
  await doctor.save();
  res.send("success");
  });
  router.post("/appointmentfix",async (req,res,next)=>{
    const doctor=await Doctor.findOne({username:req.query.doctorname});
    const patient=await Patient.findOne({username:req.query.patientname});
    doctor.currentlytreating.push(patients._id);
    await doctor.save();
    res.send("success");
  })

  router.get("/patientappoints",async(req,res,next)=>{
    const patient=await Doctor.findOne({username:req.query.param}).populate("appointments");
    
    res.send(patient.appointments);
    console.log(patient.appointments);
    
  })
  
  router.post('/patientregister',async function(req, res, next) {

    const user=await Owner.findOne({hospitalname:req.body.hospitalname});
   const  pet= new Patient({
    username: req.body.username,
    email: req.body.email,
    hospitalname:user.hospitalname,
    
    age: req.body.age,

    });
    Patient.register(pet,req.body.password).then(function(registered) {
      passport.authenticate("patient-local")(req,res,function(){
        
        res.send("success");
      })
  
    });
    user.patients.push(pet._id);
    await user.save();
    
  
  });
  router.post("/patientlogin",passport.authenticate("patient-local",{
  
    failureFlash:true,
  }),function(req,res){
    res.json("success");
  
  });
 
  

module.exports = router;

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
  //  router.post("/doctorlogin",(req,res,next)=>{
//     const {username,password}=req.body;
//     Doctor.findOne({username:username}).then(
//       user=>{
//         if(user){
//           if(user.password ===password)
//           {
//             res.json("success")
//           }
//           else{
//             res.json("failure")
//           }
//         }
//         else{
//           res.json("no record")
//         }
//       }
//     )
//   });
  // router.post('/doctorregister',async function(req, res, next) {

  //   const user=await Owner.findOne({hospitalname:req.body.hospitalname});
  //  const  doct= await Doctor.create({
  //   username: req.body.username,
  //   email: req.body.email,
  //   password: req.body.password,
  //   specialty: req.body.specialty,
  //     hospitalname:user._id
  //   });
  //   user.doctors.push(doct._id);
  //   await user.save();
  //   res.send("success");
  
  // });