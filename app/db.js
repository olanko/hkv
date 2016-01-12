/*var pgp = require('pg-promise')();
var db = pgp(process.env.DATABASE_URL);

db.one('SELECT table_schema,table_name FROM information_schema.tables;')
    .then(function (data) {
        console.log('DATA:', data.value);
    })
    .catch(function (err) {
        console.log('ERROR:', error);
    });*/

var pg = require('pg');

pg.connect(process.env.DATABASE_URL, function(err, client) {
  if (err) throw err;
  console.log('Connected to postgres! Getting schemas...');

  client
    .query('SELECT table_schema,table_name FROM information_schema.tables;')
    .on('row', function(row) {
      console.log(JSON.stringify(row));
    });
});