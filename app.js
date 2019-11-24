var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash = require('express-flash');
var session = require('express-session');
var mongoose = require('mongoose');
var expressValidator = require('express-validator');
var methodOverride = require('method-override');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRoutes = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret:"rahasia123"}));
app.use(flash());
app.use(expressValidator());
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body == 'object' && '_method' in req.body)
  {
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiRoutes);

//setting MongoDB dng Mongoose
var user = require('./models/user');
var contact = require('./models/contact');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/express');

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
