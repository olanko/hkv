module.exports = function(Transfer) {
  'use strict';
  Transfer.allByTime = function (queryparams, cb) {
    console.dir(queryparams);
    var begindate = '2016-03-20',
        enddate = '2016-03-28',
        storageid = 0,
        type = undefined,
        where = {};

    queryparams = queryparams || {};

    if (queryparams.storageid) {
        storageid = queryparams.storageid;
    }

    if (queryparams.begindate) {
        begindate = queryparams.begindate;
    }
    if (queryparams.enddate) {
        enddate = queryparams.enddate;
    }
    if (queryparams.type) {
        type = queryparams.type;
    }

    where = {
        and: [{
            or: [
                {'fromstorageid': storageid},
                {'tostorageid': storageid}
            ]},
            {'transfertime': {'gte': begindate}},
            {'transfertime': {'lte': enddate}}
        ]
    };

    if (type) {
        where.and.push({'type': type});
    }

    console.log(where);

    Transfer.find({
        where: where,
        order: 'transfertime'
    }, function (err, results) {
        console.log('err ' + err);
        console.log('results ' + results);
        cb(err, results);
    });
  };

  Transfer.remoteMethod(
    'allByTime', {
      accepts: [{ arg: 'queryparams', type: 'Object', http: { source: 'body' } }],
      returns: { arg: 'data', type: 'Array' },
      http: { path: '/allbytime', verb: 'post' }
    }
  );
};
