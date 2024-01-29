var express = require('express');
var router = express.Router();
const Owner = require("../models/users");
const passport = require('passport');
const upload = require("../middleware/multer");
const localStrategy = require("passport-local");
const Doctor = require('../models/doctors');
const Patient = require('../models/patients');
const Report = require('../models/reports');
const Chat = require('../models/chat');
const uploadcloudinary = require('../middleware/cloudinary');
passport.use('owner-local', new localStrategy(Owner.authenticate()));
passport.use('doctor-local', new localStrategy(Doctor.authenticate()));
passport.use('patient-local', new localStrategy(Patient.authenticate()));

var BASE_URL = process.env.BASE_URL;
var field;

const io = require('socket.io')(process.env.PORT2, {
  cors: {
    origin: ['http://localhost:5173']
  }
});
io.on('connection', socket => {
  console.log(socket.id);
  socket.on('loadHistory', async ({ sendername, receivername }) => {
    try {
      const me = await Chat.find({ sendername: sendername, receivername: receivername }).sort({ timestamp: 1 });
      const you = await Chat.find({ sendername: receivername, receivername: sendername }).sort({ timestamp: 1 });
      let arr = [...me, ...you];
      arr.sort((a, b) => a.timestamp - b.timestamp);

      console.log(arr);
      socket.emit('history', arr);

    } catch (error) {
      console.error('Error loading chat history:', error);
    }
  });
  socket.on("send-message", async (messag) => {
    console.log(messag);
    const { sendername, receivername, message } = messag;
    const chat = new Chat({ sendername, receivername, message });
    await chat.save();
    io.emit(sendername + receivername, messag);
    io.emit(receivername + sendername, messag);
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  })
})


/* GET home page. */
router.get('/', function (req, res, next) {
  res.send({ message: 'hi' });
});


router.post("/ownerregister", upload.single("file"), async function (req, res, next) {

  try {

    const hospimage = req.file.path;
    const hospitalimage = await uploadcloudinary(hospimage);
    const ownerdata = new Owner({
      username: req.body.username,
      email: req.body.email,
      hospitalname: req.body.hospitalname,
      image: hospitalimage.url,
    })

    Owner.register(ownerdata, req.body.password).then(function (registereduser) {
      passport.authenticate("owner-local")(req, res, function () {

        res.status(200).send({
          message: "success",
          hospitalimage: hospitalimage.url
        });
      })
    })

  } catch (error) {
    res.status(500).send({ message: "something went wrong" });
  }
});
router.post("/ownerlogin", passport.authenticate("owner-local", {

  failureFlash: true,
}), function (req, res) {
  
  res.send("success");

});
router.get("/doctorlistowner", async (req, res, next) => {
  const name = req.query.search;
  const user = await Owner.findOne({ username: name }).populate("doctors");
  if (!user) {
    res.status(404).send("no doctors with username found");
  }
  else {
    res.status(200).send(user.doctors);
  }
});
router.delete("/removedoctor", async (req, res, next) => {

  const doc = await Doctor.findOne({ username: req.query.doctor });
  const owner = await Owner.findOne({ username: req.query.owner });
  if (doc && owner) {
    owner.doctors.splice(doc._id, 1);
    const deleteddoc = await Doctor.findOneAndDelete({ username: req.query.doctor });
  }
  if (deleteddoc) {
    res.status(200).send("success");
  }
  else {
    res.send("failure");
  }
});


router.post('/doctorregister', async function (req, res, next) {

  try {
    const user = await Owner.findOne({ hospitalname: req.body.hospitalname });
    const doct = new Doctor({
      username: req.body.username,
      email: req.body.email,
      speciality: req.body.speciality,
      hospitalname: user.hospitalname,
    });
    Doctor.register(doct, req.body.password,).then(function (registered) {
      passport.authenticate("doctor-local")(req, res, function () {
      })

    })
    user.doctors.push(doct._id);
    await user.save();
    res.status(200).send("success");

  } catch (error) {

    res.status(500).send(error.message);
 }
});
router.post("/doctorlogin", passport.authenticate("doctor-local", {

  failureFlash: true,
}), function (req, res) {
  
  res.status(200).send("success");

});

router.get("/doctorlist", async (req, res, next) => {
  try {
    const hospitalname = req.query.search;
    const user = await Owner.findOne({ hospitalname: hospitalname }).populate("doctors");
    const arr = user.doctors;
    res.status(200).send(arr);
    console.log(arr);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.get("/doctorspatient", async (req, res, next) => {
  try {
    const doctorname = req.query.search;
    const doct = await Doctor.findOne({ username: doctorname }).populate("currentlytreating");

    res.status(200).send(doct.currentlytreating);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.get("/appointment", async (req, res, next) => {
  try {
    const patient = await Patient.findOne({ username: req.query.param2 });
    const doctor = await Doctor.findOne({ username: req.query.param1 });

    doctor.appointments.push(patient._id);
    await doctor.save();
    res.status(200).send("success");
  } catch (error) {
    res.status(500).send(error.message);
  }
});
router.post("/appointmentfix", async (req, res, next) => {
  try {
    const doctor = await Doctor.findOne({ username: req.body.username });
    const patient = await Patient.findOne({ username: req.body.patientname });
    doctor.currentlytreating.push(patient._id);
    await doctor.save();
    patient.doctortreating.push(doctor._id);
    await patient.save();

    doctor.appointments.splice(patient._id, 1);
    await doctor.save();
    res.status(200).send("success");
  } catch (error) {
    res.status(404).send(error.message);
  }
});
router.get("/appointmentdecline", async (req, res, next) => {
  try {
    const doctor = await Doctor.findOne({ username: req.query.doctorname });
    const patient = await Patient.findOne({ username: req.query.patientname });
    doctor.appointments.splice(patient._id, 1);
    await doctor.save();
    res.status(200).send("success");
  } catch (error) {
    res.status(500).send(error.message);
  }
});
router.get("/doctortreating", async (req, res, next) => {

  try {
    const patient = await Patient.findOne({ username: req.query.search }).populate("doctortreating");
    res.status(200).send(patient.doctortreating);
  } catch (error) {
    res.status(400).send(error.message);
  }
});
router.post("/assignreport", async (req, res, next) => {

  try {
    const doctors = await Doctor.findOne({ username: req.body.doctorname });

    const patient = await Patient.findOne({ username: req.body.username });
    const report = await Report.create({
      username: req.body.username,
      disease: req.body.disease,
      symptoms: req.body.symptoms,
      medicines: req.body.medicines,
      diet: req.body.diet,
      doctor: doctors._id,
      patient: patient._id,

    });
    doctors.patientreports.push(report._id);
    await doctors.save();
    patient.report = report._id;
    await patient.save();
    res.status(200).send("success");
  } catch (error) {


    res.status(400).send(error.message);
  }
});
router.get("/patienttreated", async (req, res, next) => {
  try {
    const doctor = await Doctor.findOne({ username: req.query.search }).populate("patienttreated");
console.log(req.session.user);
    {
      res.status(200).send(doctor.patienttreated);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }

});
router.post("/treated", async (req, res, next) => {
  try {
    const doctor = await Doctor.findOne({ username: req.body.doctorname });
    const patient = await Patient.findOne({ username: req.body.patientname });
    doctor.patienttreated.push(patient._id);
    doctor.currentlytreating.splice(patient._id, 1);
    patient.doctortreating.splice(doctor._id, 1);

    await doctor.save();
    await patient.save();
    res.status(200).send("success");


  } catch (error) {
    res.status(400).send(error.message);
  }
});
router.post("/nottreated", async (req, res, next) => {
  try {
    const doctor = await Doctor.findOne({ username: req.body.doctorname });
    const patient = await Patient.findOne({ username: req.body.patientname });
    doctor.died.push(patient._id);
    doctor.currentlytreating.splice(patient._id, 1);
    await doctor.save();
    res.status(200).send("success");
  } catch (error) {
    res.status(400).send(error.message);
  }

});
router.get("/performance", async (req, res, next) => {
  const doctor = await Doctor.findOne({ username: req.query.search });
  const life = doctor.patienttreated.length;
  const death = doctor.died.length;
  if (death == 0) {
    let x = ((life)).toString();
    console.log(x);
    res.send(x);
  }
  else {
    let x = (((life / death))).toString();
    console.log(x);
    res.send(x);
  }
});
router.get("/patientappoints", async (req, res, next) => {
  try {
    const patient = await Doctor.findOne({ username: req.query.param }).populate("appointments");

    res.status(200).send(patient.appointments);

  } catch (error) {
    res.status(400).send(error.message);
  }

});
router.get("/died", async (req, res, next) => {
  try {
    const patient = await Doctor.findOne({ username: req.query.search }).populate("died");

    res.status(200).send(patient.died);

  } catch (error) {
    res.status(400).send(error.message);
  }

})


router.post('/patientregister', async function (req, res, next) {

  try {
    const user = await Owner.findOne({ hospitalname: req.body.hospitalname });
    const pet = new Patient({
      username: req.body.username,
      email: req.body.email,
      hospitalname: user.hospitalname,

      age: req.body.age,

    });
    Patient.register(pet, req.body.password).then(function (registered) {
      passport.authenticate("patient-local")(req, res, function () {

        res.status(200).send("success");
      })

    });
    user.patients.push(pet._id);
    await user.save();
  } catch (error) {

    res.status(400).send(error.message);

  }


});
router.post("/patientlogin", passport.authenticate("patient-local", {

  failureFlash: true,
}), function (req, res) {
  res.send("success");

});
router.get("/seereports", async (req, res, next) => {
  try {
    const patient = await Patient.findOne({ username: req.query.name }).populate("report");

    res.status(200).send(patient.report);

  } catch (error) {

    res.status(400).send(error.message);
  }

});
router.get("/message", async (req, res, next) => {
  try {
    const me = await Chat.find({
      sendername: req.query.sendername,
      receivername: req.query.receivername,
    }).sort({ timestamp: 1 });
    const you = await Chat.find({
      sendername: req.query.receivername,
      receivername: req.query.sendername,
    }).sort({ timestamp: 1 });
    res.status(200).send({
      "me": me,
      "you": you
    });
  } catch (error) {
    res.status(500);
  }
});
router.get("/hospitals", async (req, res, next) => {
  try {
    const hosp = await Owner.find({});
    res.status(200).send(hosp);
  } catch (error) {
    res.status(400).send(error.message);
  }
});
function isLoggedIn(req,res,next){
  if(req.isAuthenticated()) return next();
  res.send('not login');
}


module.exports = router;

