var express = require('express');
var router = express.Router();

// router.use('/comments', require('./comments'));
// router.use('/users', require('./users'));

// router.use('/storage', require('./storages'));

router.get('/partials/:name',  function (req, res) {
  var name = req.params.name;
  res.render('partials/' + name);
});

router.get('/', function(req, res) {
  res.render('pages/index');
});

router.get('*', function(req, res) {
  res.render('pages/index');
});

module.exports = router;