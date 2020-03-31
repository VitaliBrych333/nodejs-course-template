// require('./passport/config');
const express = require('express');
// const mongoose = require('mongoose');
// const exphbs  = require('express-handlebars');

// const authorizRouter = require('./routers/authoriz-router');
// const registrRouter = require('./routers/registr-router');
const boardsRouter = require('./routers/boards');
// const router = require('./routers/router');
// const passport = require('passport');
const app = express();
// const session = require('express-session');
// const FileStore = require('session-file-store')(session);

// mongoose.connect(
//     'mongodb://admin:admin2019@ds043168.mlab.com:43168/frontcamp',
//     { useNewUrlParser: true, useFindAndModify: false},
// );

// app.engine('handlebars', exphbs());
// app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 4000);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use(passport.initialize());
// app.use(passport.session());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  next();
});

app.use('/', boardsRouter);
// app.use('/registration', registrRouter);
// app.use('/authorization', authorizRouter);
// app.use('/', router);

app.use((req, res) => {
  res.status(500).send('Smth went wrong');
});

app.listen(app.get('port'), () => {
  console.log(`Node app is running at localhost:${app.get('port')}`);
});
