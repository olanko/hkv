angular.module('hkApp.controllers', [])

.controller('MainCtrl', ['$scope', '$http', function  ($scope, $http) {
    $http.get('/api/storages')
        .success(function (data) {
            $scope.storages = data;
        });
}]);
