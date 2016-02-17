/*jslint nomen:true */
/*globals angular,moment,_ */
angular.module('hkApp.controllers')
.controller('TransfersCtrl',
    ['$scope', '$routeParams', '$q', 'Storage', 'Product', 'Transfer', 'CurrentQtysService',
    function  ($scope, $routeParams, $q, Storage, Product, Transfer, CurrentQtysService) {
        'use strict';
        $scope.storageid = $routeParams.storageid;
        $scope.productid = $routeParams.productid;

        $scope.transfers = [];
        $scope.storages = [];
        $scope.products = [];
        $scope.datenow = moment();

        $scope.filters = {};

        $scope.types = ['Siirto', 'Toimitus', 'Myynti', 'Inventaario'];

        $scope.storages = Storage.find();
        $scope.products = Product.find();

        $scope.findTransfers = function () {
            var where = '', productwhere = '', filter = {}, s;

            if ($scope.filters.storage) {
                s = $scope.filters.storage;
                $scope.storageid = s.id;

                where = { 'or': [ {'fromstorageid': s.id}, {'tostorageid': s.id} ]};
            } else {
                $scope.storageid = undefined;
            }

            if ($scope.productid) {
                productwhere = {'productid': $scope.productid};
                if (where) {
                    where = {'and': [where, productwhere]};
                } else {
                    where = productwhere;
                }
            }

            if (where) {
                filter = {'filter': {'where': where, 'order': ['transfertime', 'type']}};
            }

            Transfer.find(filter)
            .$promise
            .then(function (data) {
                $scope.transfers = data;

                if ($scope.filters.storage) {
                    $q.all([
                        $scope.products.$promise
                    ]).then(function () {
                        CurrentQtysService.setCurrentQtys($scope.transfers, $scope.products, $scope.filters.storage);
                    });
                }
            });
        };


        if ($scope.storageid) {
            Storage.findById({'id': $scope.storageid})
            .$promise
            .then(function (data) {
                $scope.filters.storage = data;
                $scope.findTransfers();
            });
        } else {
            $scope.findTransfers();
        }

        $scope.setProductFilter = function (productid) {
            $scope.productid = productid;
            $scope.findTransfers();
        };
    }
]);