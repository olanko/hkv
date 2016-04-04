/*global angular */
angular.module('hkApp.controllers')
.controller('StorageReportCtrl',
    ['$scope', '$routeParams', '$q', 'Storage', 'Product', 'Transfer', 'CurrentQtysService',
    function  ($scope, $routeParams, $q, Storage, Product, Transfer, CurrentQtysService) {
        'use strict';
        $scope.types = ['Siirto', 'Toimitus', 'Myynti', 'Inventaario'];

        $scope.filters = {};
        $scope.filters.storage = {};

        $scope.storages = [];

        /* Get all Storages and Products */
        $scope.storages = Storage.find();

        $scope.products = Product.find();

        var queryparams = {
            begindate: '2016-03-20',
            enddate: '2016-03-27'
        };

        /* Current storage */
        Storage.findById({'id': $routeParams.storageid})
            .$promise
            .then(function (data) {
                $scope.filters.storage = data;
            });

        var transfers = {}, deliveries = {}, sales = {}, waste = {};
        $scope.reportdata = {};

        $scope.updateData = function () {
            $q.all([
                QS.transfers(Transfer, queryparams).$promise,
                QS.deliveries(Transfer, queryparams).$promise,
                QS.sales(Transfer, queryparams).$promise,
                QS.inventories(Transfer, queryparams).$promise
            ]).then(function (results) {
                console.log(results);
            });
        };

        $scope.$watchCollection('filters.storage', function (newSto, oldSto, $scope) {
            if (!newSto) {
                return false;
            }
            if (newSto !== oldSto) {
                $scope.updateData();
            }
        });

        $scope.setStorage = function (storage) {
            $scope.filters.storage = storage;
        };
}]);