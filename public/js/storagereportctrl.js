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
                fromsto = {},
                reportdata = {};

            var storageid = $scope.filters.storage.id;
            queryparams = {
                begindate: '2016-04-02',
                enddate: '2016-04-11',
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

                tosto = groupByProduct(tosto);
                fromsto = groupByProduct(fromsto);
                deliveries = groupByProduct(deliveries);
                sales = groupByProduct(sales);
                waste = groupByProduct(waste);

                _.forEach($scope.products, function (product) {
                    var pid = product.id;
                    console.log(inventor);

                    reportdata[pid] = {
                        name: product.name,
                        transfers: soz(tosto, pid) - (soz(fromsto, pid) - soz(waste, pid)),
                        deliveries: soz(deliveries, pid),
                        sales: soz(sales, pid),
                        waste: soz(waste, pid),
                        startvalue: _.find(inventories, {'productid': pid}),
                        endvalue: _.findLast(inventories, {'productid': pid}).absolute
                    }
                });

                $scope.reportdata = reportdata;
                console.log(reportdata);
            });
        };

        function soz(list, index) {
            return list[index] ? +list[index].sum : 0;
        }
        function groupByProduct(list) {
            return _(list)
            .groupBy('productid')
            .transform(function (result, current, key) {
                result[key] = {
                    productid: current[0].productid,
                    sum: _.reduce(current, function (sum, item) {
                        return +sum + +item.relative;
                    }, 0.0)
                };
            }, [])
            .value();
        }

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