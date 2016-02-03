var express = require('express');
var router = express.Router();
var _ = require('lodash');

var Promise = require('bluebird');

var app = require('../api/server/server');

var Storage = app.models.Storage;
var Product = app.models.Product;

//router.get('/:id(\\d+)', function(req, res) {
router.get('/', function(req, res) {
    req.params.id = +req.params.id;

    Promise.all([Storage.find(), Product.find()])
    .spread(function (storages, products) {
        res.render('pages/transfer', {storages: storages, products: storages});
    })
    .catch(function (err) {
            console.log(err);
        });
});

router.get('/', function(req, res) {
    Storage.all(function(err, storages) {
        res.render('storages', {storages: _.sortByAll(storages, ['default', 'name'])});
    });
});

module.exports = router;