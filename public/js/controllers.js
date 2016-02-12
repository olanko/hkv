angular.module('hkApp.controllers', [])

.controller('MainCtrl', ['$scope', '$http', 'Storage', function  ($scope, $http, Storage) {
    Storage.find()
    .$promise
    .then(function (data) {
            $scope.storages = data;
    });
}]);
