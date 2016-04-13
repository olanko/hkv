var QS = (function () {
    'use strict';
    function transfersByType(Transfer, queryparams, type) {
        var begindate = '2016-03-20',
            enddate = '2016-03-28';

        queryparams = queryparams || {};

        if (queryparams.begindate) {
            begindate = queryparams.begindate;
        }
        if (queryparams.enddate) {
            enddate = queryparams.enddate;
        }

        return Transfer.find({filter: {
            where: {
                and: [
                    {'transfertime': {'gte': begindate}},
                    {'transfertime': {'lte': enddate}},
                    {'type': type}
                ]
            },
        }});
    }
    var queries = {
        transfers: function (Transfer, queryparams) {
            return transfersByType(Transfer, queryparams, 0);
        },
        deliveries: function (Transfer, queryparams) {
            return transfersByType(Transfer, queryparams, 1);
        },
        sales: function (Transfer, queryparams) {
            return transfersByType(Transfer, queryparams, 2);
        },
        inventories: function (Transfer, queryparams) {
            return transfersByType(Transfer, queryparams, 3);
        }
    };
    return queries;
}());

// , {where: {'transfertime': {gt: '2016-03-20'}}}
