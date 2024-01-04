var express = require('express');
var router = express.Router();
const Owner=require("./users");
const passport= require('passport');
const localStrategy=require("passport-local");
const Doctor = require('./doctors');
const Patient = require('./patients');
const Report = require('./reports');
const Chat = require('./chat');
passport.use('owner-local',new localStrategy(Owner.authenticate()));
passport.use('doctor-local', new localStrategy(Doctor.authenticate()));
passport.use('patient-local', new localStrategy(Patient.authenticate()));
const io=require('socket.io')(4000,{

  cors:{
    origin:['http://localhost:5173']
  }
});
io.on('connection',socket =>{
  console.log(socket.id);
  socket.on('loadHistory', async ({ sendername, receivername }) => {
    try {
      const me = await Chat.find({ sendername, receivername }).sort({ timestamp: 1 });
      const you = await Chat.find({ sendername: receivername, receivername: sendername }).sort({ timestamp: 1 });
      const arr=[me,you];
      // console.log(me);
      // console.log(you);
      console.log(arr);
      socket.emit('history',arr);
      
    } catch (error) {
      console.error('Error loading chat history:', error);
    }
  });
  socket.on("send-message",async (messag)=>{
    console.log(messag);
    const {sendername,receivername,message}=messag;
    const chat=new Chat({sendername,receivername,message});
    await chat.save();
    
    

    // io.emit('receive-message',message)
    io.emit('receive-message',messag);
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  })
})


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
    
    speciality: req.body.speciality,
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
  
  router.get("/doctorspatient",async (req,res,next)=>{
    const doctorname=req.query.search;
  const doct= await Doctor.findOne({username:doctorname}).populate("currentlytreating");

      res.send(doct.currentlytreating);
    
    
    
  });
  
  router.get("/appointment",async (req,res,next)=>{
    const patient=await Patient.findOne({username:req.query.param2});
  const doctor=await Doctor.findOne({username:req.query.param1});

  doctor.appointments.push(patient._id);
  await doctor.save();
  res.send("success");
  });
  router.post("/appointmentfix",async (req,res,next)=>{
    const doctor=await Doctor.findOne({username:req.body.username});
    const patient=await Patient.findOne({username:req.body.patientname});
    doctor.currentlytreating.push(patient._id);
    await doctor.save();
    patient.doctortreating.push(doctor._id);
    await patient.save();
   
    doctor.appointments.splice(patient._id, 1);
    await doctor.save();
    res.send("success");
  });
  router.get("/appointmentdecline",async(req,res,next)=>{
    const doctor=await Doctor.findOne({username:req.query.doctorname});
    const patient=await Patient.findOne({username:req.query.patientname});
    doctor.appointments.splice(patient._id, 1);
    await doctor.save();
    res.send("success");
  });
  router.get("/doctortreating",async(req,res,next)=>{

    const patient=await Patient.findOne({username:req.query.search}).populate("doctortreating");
    

    res.send(patient.doctortreating);
  });
  router.post("/assignreport",async(req,res,next)=>{
    
    const doctors=await Doctor.findOne({username:req.body.doctorname});

    const patient=await Patient.findOne({username:req.body.username});
    const report=await Report.create({username:req.body.username,
      disease:req.body.disease ,
      symptoms: req.body.symptoms,
      medicines:req.body.medicines,
      diet:req.body.diet,
      doctor:doctors._id,
      patient:patient._id,

    });
    doctors.patientreports.push(report._id);
    await doctors.save();
    patient.report=report._id;
    await patient.save();
 
    
   
    
    res.send("success");
  });
  router.get("/patienttreated",async(req,res,next)=>{
    const doctor=await Doctor.findOne({username:req.query.search}).populate("patienttreated");
  
    {
    res.send(doctor.patienttreated);
    }
    
    
  });
router.post("/treated",async(req,res,next)=>{
  const doctor=await Doctor.findOne({username:req.body.doctorname});
  const patient=await Patient.findOne({username:req.body.patientname});
  doctor.patienttreated.push(patient._id);
  doctor.currentlytreating.splice(patient._id, 1);
  patient.doctortreating.splice(doctor._id, 1);

  await doctor.save();
  await patient.save();


});
router.post("/nottreated",async(req,res,next)=>{
  const doctor=await Doctor.findOne({username:req.body.doctorname});
  const patient=await Patient.findOne({username:req.body.patientname});
  doctor.died.push(patient._id);
  doctor.currentlytreating.splice(patient._id, 1);
  await doctor.save();
  

});
router.get("/performance",async(req,res,next)=>{
  const doctor=await Doctor.findOne({username:req.query.search});
  const life=doctor.patienttreated.length;
  const death= doctor.died.length;
  if(death==0)
  {let x=((life*100)).toString();
    console.log(x);
    res.send(x);
  }
  else{
    let x=(((life/death)*100)).toString();
    console.log(x);
    res.send(x);
  }

  

});
  router.get("/patientappoints",async(req,res,next)=>{
    const patient=await Doctor.findOne({username:req.query.param}).populate("appointments");
    
    res.send(patient.appointments);
    
    
  });
  router.get("/died",async(req,res,next)=>{
    const patient=await Doctor.findOne({username:req.query.search}).populate("died");
    
    res.send(patient.died);
  
    
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
  router.get("/seereports",async(req,res,next)=>{
    const patient=await Patient.findOne({username:req.query.name}).populate("report");
    
    res.send(patient.report);
  
    
  });
  router.get("/message",async(req,res,next)=>{
    const me=await Chat.find({
      sendername:req.query.sendername,
      receivername:req.query.receivername,
    }).sort({timestamp:1});
    const you=await Chat.find({
      sendername:req.query.receivername,
      receivername:req.query.sendername,
    }).sort({timestamp:1});
    res.send({"me":me,
  "you":you});
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