/*global angular */
angular.module('hkApp.controllers', [])

.controller('MainCtrl', ['$scope', 'Storage', 'User', function ($scope, Storage, User) {
    'use strict';
    Storage.find()
    .$promise
    .then(function (data) {
            $scope.storages = data;
    });

    $scope.User = User;
    $scope.user = User.getCurrent();
}])
.controller('LoginCtrl', ['$scope', '$location', 'User', function ($scope, $location, User) {
    'use strict';

    console.log($location);

    $scope.user = {};
    $scope.user.login = function () {
        var user = $scope.user;
        $scope.alert = {};

        User.login(user)
        .$promise
        .then(function (token) {
            var next = $location.nextAfterLogin || '/';
            $location.nextAfterLogin = null;
            $location.path(next);
        })
        .catch(function (err) {
            $scope.alert.msg = 'Kirjautuminen epäonnistui';
            $scope.alert.type = 'warning';
        });
    };
}]);