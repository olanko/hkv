module.exports = function(Transfer) {
  'use strict';
  Transfer.allByTime = function (queryparams, cb) {
    console.log(queryparams);
    var begindate = '2016-03-20',
        enddate = '2016-03-28',
        storageid = 1,
        type = 0;

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

    return Transfer.find({
        where: {
            and: [{
                or: [
                    {'fromstorageid': storageid},
                    {'tostorageid': storageid}
                ]},
                {'transfertime': {'gte': begindate}},
                {'transfertime': {'lte': enddate}}
            ]
        },
        order: 'transfertime'
    }, function (err, result) {
            cb(err, result);
    });
  };

  Transfer.remoteMethod(
    'allByTime', {
      accepts: [{ arg: 'queryparams', type: 'Object' }],
      returns: { arg: 'data', type: 'Array' },
      http: { path: '/allbytime', verb: 'post' }
    }
  );
};
