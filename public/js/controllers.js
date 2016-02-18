/*global angular */
angular.module('hkApp.controllers', [])

.controller('MainCtrl', ['$scope', '$rootScope', 'Storage', 'User', function ($scope, $rootScope, Storage, User) {
    'use strict';

    $scope.user = {};

    Storage.find()
    .$promise
    .then(function (data) {
            $scope.storages = data;
    });

    $scope.User = User;

    if (User.isAuthenticated()) {
        $scope.user = $rootScope.user;
    }

    $rootScope.$watch('user', function (newValue, oldValue) {
        if (User.isAuthenticated()) {
            $scope.user = User.getCurrent();
        } else {
            $scope.user = {};
        }
    });

    $scope.logout = function () {
        User.logout()
        .$promise
        .then(function (data) {
            $rootScope.user = {};
        }).catch(function (err) {
            console.log(err);
        });
    };
}])
.controller('LoginCtrl', ['$scope', '$rootScope', '$location', 'User', function ($scope, $rootScope, $location, User) {
    'use strict';

    $scope.user = {};
    $scope.user.login = function () {
        var user = $scope.user;
        $scope.alert = {};

        User.login(user)
        .$promise
        .then(function (token) {
            /* Tell watcher to update navbar user name. */
            $rootScope.user = token.user;
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