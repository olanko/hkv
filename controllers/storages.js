var express = require('express');
var router = express.Router();
var _ = require('lodash');

var Storage = app.models.storage;

router.get('/:id(\\d+)', function(req, res) {
    req.params.id = +req.params.id;

    Storage.get(req.params.id, function (err, storage) {
        if (err) { throw err; }
        res.render('storage', {storage: storage});
    });
});

router.get('/', function(req, res) {
    Storage.all(function(err, storages) {
        res.render('storages', {storages: _.sortByAll(storages, ['default', 'name'])});
    });
});

module.exports = router;