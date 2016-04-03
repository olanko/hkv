var _ = require('lodash');

module.exports = function(Storage) {
  Storage.transfersByProduct = function(storageid, cb) {
    var ret;
    Storage.dataSource.connector.query(
        'select name, productid, type, ' +
        ' sum(absolute) as absolute, sum(relative) as relative' +

        ' from (select p.name, productid, type, ' +
        ' absolute, relative' +
        ' from transfer t inner join product p on p.id = t.productid ' +
        ' where type <> 3 and tostorageid = $2 ' +
        ' and transfertime > $3 ' +


        ' union ' +

        'select p.name, productid, type, ' +
        ' absolute, -relative' +
        ' from transfer t inner join product p on p.id = t.productid ' +
        ' where type = 0 and fromstorageid = $1 ' +
        ' and transfertime > $3) as tr' +

        '  group by name, productid, type ' +
        '  order by name;',
        [storageid, storageid, '2016-03-20'],
        function (err, result) {
            ret = _(result)
                .groupBy('name')
                .forEach(function (r, index, arr) {
                    arr[index] = _.groupBy(r, 'type');
                })
                .value();
            cb(err, ret);
        });
    };

  Storage.remoteMethod(
    'transfersByProduct', {
      accepts: [{ arg: 'storageid', type: 'string' }],
      returns: { arg: 'data', type: 'Array' },
      http: { path: '/transfersbyproduct', verb: 'post' }
    }
  );
};