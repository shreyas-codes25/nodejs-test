var createError = require('http-errors');
var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan'); 
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var contactRouter=require('./routes/contact')
var apiRouter=require('./routes/api')
var registerRouter=require('./routes/auth/register')
var loginRouter=require('./routes/auth/login');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/users', usersRouter);
app.use('/auth/register',registerRouter);
app.use('/auth/login',loginRouter);
app.use('/contact',contactRouter);
app.use('/api',apiRouter);
app.use('/', contactRouter);

//WIP
// //route for mongo database prodcuts
// app.get('/products', async (req, res) => {
//   const page=parseInt(req.query.page) || 1;
//   const limit = parseInt(req.query.limit) || 10;
//   const startIndex = (page - 1) * limit;
//   const total = await Product.countDocuments();

//   const products = await Product.find();
//   res.json({products,page,total})

//   res.json({page,limit,total,
//     pages: Math.ceil(total / limit),
//     data: products
//   });
// })


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// mongoose.connect('mongodb://localhost:27017/yourdb',
//  { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.log(err));

// const Product = mongoose.model('Product', new mongoose.Schema({
//     name: String,
//     price: Number
// }));

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