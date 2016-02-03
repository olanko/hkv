var express = require('express');
var router = express.Router();

// router.use('/comments', require('./comments'));
// router.use('/users', require('./users'));

// router.use('/storage', require('./storages'));

router.use('/transfer', require('./transfer'));

router.get('/', function(req, res) {
  res.render('index');
});

module.exports = router;