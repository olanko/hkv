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

        $scope.reportdata = {};

        $scope.updateData = function () {
            var WASTESTOID = 8;

            var transfers = {},
                deliveries = {},
                sales = {},
                inventories = {},
                waste = {},
                tosto = {},
                fromsto = {};

            var storageid = $scope.filters.storage.id;
            queryparams = {
                begindate: '2016-03-20',
                enddate: '2016-04-28',
                storageid: storageid
            };

            Transfer.allByTime(queryparams, function (results) {
                transfers = results.data;
                tosto = _.filter(transfers, {'type': 0, tostorageid: '' + storageid });
                fromsto = _.filter(transfers, {'type': 0, fromstorageid: '' + storageid });
                deliveries = _.filter(transfers, {'type': 1, tostorageid: '' + storageid });
                sales = _.filter(transfers, {'type': 2, 'fromstorageid': '' + storageid });
                inventories = _.filter(transfers, {'type': 3, tostorageid: '' + storageid });
                waste = _.filter(transfers, {type: 0, tostorageid: '' + WASTESTOID });

                console.log(sales);
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