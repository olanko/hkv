var _ = require('lodash');

var storages = [
    {'id': 1, 'name': 'Varasto', 'default': 'true'},
    {'id': 2, 'name': 'Villipeura'},
    {'id': 3, 'name': 'Villikko'},
    {'id': 4, 'name': 'Villiruusu'}
];

exports.get = function(id, cb) {
    var ret = _.find(storages, { 'id' : id });

    if (!ret) {
        cb('storage not found: ' + id);
    }
    cb(null, ret);
};

// Get all comments
exports.all = function(cb) {
  cb(null, storages);
};
