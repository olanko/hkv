module.exports = function(app) {
    var cb = console.log;
    app.models.User.create(
    [{username: 'admin', email: 'olli.korhonen@iki.fi', password: 'opensesame'},
    {username: 'Olli', email: 'olli.korhonen@iki.fi', password: 'opensesame'}
    ]
  , function(err, users) {
    if (err) return cb(err);

    //create the admin role
    app.models.Role.create({
      name: 'admin'
    }, function(err, role) {
      if (err) cb(err);

      //make bob an admin
      role.principals.create({
        principalType: app.models.RoleMapping.USER,
        principalId: users[0].id
      }, function(err, principal) {
        cb(err);
      });
    });
  });
};