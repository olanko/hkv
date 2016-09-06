/*globals angular,_ */
/*jslint nomen: true */
/*jshint nomen: true */

angular.module('hkApp.controllers')
.controller('StorageReportCtrl',
    ['$scope', '$routeParams', '$q', 'Storage', 'Product', 'Transfer',
    function  ($scope, $routeParams, $q, Storage, Product, Transfer) {
        'use strict';
        $scope.types = ['Siirto', 'Toimitus', 'Myynti', 'Inventaario'];

        var d = moment();
        $scope.filters = {
            storage: {},
            begindate: moment().subtract(moment().day() + 6, 'days').startOf('day').toDate(), //last weeks monday
            enddate: moment().subtract(moment().day() - 1, 'days').startOf('day').toDate(), //this weeks monday
        };

        $scope.storages = [];

        /* Get all Storages and Products */
        $scope.storages = Storage.find();

        $scope.products = Product.find();

        /* Current storage */
        Storage.findById({'id': $routeParams.storageid})
            .$promise
            .then(function (data) {
                $scope.filters.storage = data;
            });


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
                        return +sum + (+item.relative);
                    }, 0.0)
                };
            }, [])
            .value();
        }

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

            var storageid = $scope.filters.storage.id.toString();
            var queryparams = {
                begindate: $scope.filters.begindate,
                enddate: $scope.filters.enddate,
                storageid: storageid
            };
            var salesqueryparams = {
                begindate: queryparams.begindate,
                enddate: queryparams.enddate,
                storageid: storageid
            };

            $q.all([
                Transfer.allByTime(queryparams).$promise,
                Transfer.allByTime(salesqueryparams).$promise
            ])
            .then(function (results) {
                transfers = results[0].data;
                sales = results[1].data;

                tosto = _.filter(transfers, {'type': 0, tostorageid: storageid });
                fromsto = _.filter(transfers, {'type': 0, fromstorageid: storageid });
                deliveries = _.filter(transfers, {'type': 1, tostorageid: storageid });
                sales = _.filter(sales, {'type': 2, 'fromstorageid': storageid });
                inventories = _.filter(transfers, {'type': 3, tostorageid: storageid });
                waste = _.filter(transfers, {type: 0, tostorageid: WASTESTOID.toString() });

                tosto = groupByProduct(tosto);
                fromsto = groupByProduct(fromsto);
                deliveries = groupByProduct(deliveries);
                sales = groupByProduct(sales);
                waste = groupByProduct(waste);

                _.forEach($scope.products, function (product) {
                    var pid = product.id.toString(),
                        first = _.find(inventories, {'productid': pid}),
                        last = _.findLast(inventories, {'productid': pid}),
                        r;

                    reportdata[pid] = {
                        name: product.name,
                        transfers: soz(tosto, pid) - (soz(fromsto, pid) - soz(waste, pid)),
                        deliveries: soz(deliveries, pid),
                        sales: soz(sales, pid),
                        waste: soz(waste, pid),
                        startvalue: first ? +first.absolute : 0,
                        endvalue: last ? +last.absolute : 0
                    };
                    r = reportdata[pid];

                    var valuesFound = (_.reduce([r.transfers, r.deliveries, -r.sales, r.waste],
                        function (sum, i) {
                            return sum + Math.abs(i);
                        }, 0)
                    ) > 0;

                    r.expected = r.startvalue + r.transfers + r.deliveries + r.sales - r.waste;

                    /* Show decorated <td> if some of the values !== 0*/
                    if (valuesFound) {
                        if (r.expected === r.endvalue) {
                            r.class = 'bg-success';
                        }
                        if (r.expected !== r.endvalue) {
                            r.class = 'bg-danger';
                        }
                    }
                });

                $scope.reportdata = reportdata;
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
