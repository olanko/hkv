
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var express = require('express');
var enforce = require('express-sslify');

var app = express();
var env = process.env.NODE_ENV || 'development';

app.set('port', (process.env.PORT || 5000));

if (env === 'production') {
    app.use(enforce.HTTPS({ trustProtoHeader: true }));
}

var api = require('./api/server/server');
app.use('/api', api);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers'));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
