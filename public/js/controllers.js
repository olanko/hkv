/*global angular */
angular.module('hkApp.controllers', [])

.controller('MainCtrl', ['$scope', 'Storage', function  ($scope, Storage) {
    'use strict';
    Storage.find()
    .$promise
    .then(function (data) {
            $scope.storages = data;
    });
}]);
