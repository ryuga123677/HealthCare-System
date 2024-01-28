

var createError = require('http-errors');
const cors = require('cors');
var express = require('express');
var app = express();


const mongoose = require('mongoose');



const passport = require('passport');
var path = require('path');

var cookieParser = require('cookie-parser');
var logger = require('morgan');
const expressSessions = require('express-session');


var indexRouter = require('./routes/index');
var usersRouter = require('./models/users');
var doctorRouter = require('./models/doctors');
var patientRouter = require('./models/patients');






// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressSessions({
  resave: false,
  saveUninitialized: false,
  secret: 'hey hey'
}
));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(usersRouter.serializeUser());
passport.deserializeUser(usersRouter.deserializeUser());
passport.serializeUser(doctorRouter.serializeUser());
passport.deserializeUser(doctorRouter.deserializeUser());
passport.serializeUser(patientRouter.serializeUser());
passport.deserializeUser(patientRouter.deserializeUser());
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/doctors', doctorRouter);
app.use('/patients', patientRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
