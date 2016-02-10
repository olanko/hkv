angular.module('hkApp.controllers')
.controller('TransfersCtrl',
    ['$scope', '$http', '$routeParams', '$q', 'Storage', 'Product', 'Transfer', 'CurrentQtysService',
    function  ($scope, $http, $routeParams, $q, Storage, Product, Transfer, CurrentQtysService) {
        $scope.storageid = $routeParams.storageid;
        $scope.productid = $routeParams.productid;

        $scope.transfers = [];
        $scope.storages = [];
        $scope.products = [];
        $scope.datenow = moment();

        $scope.filters = {};

        $scope.types = ['Siirto', 'Toimitus', 'Myynti', 'Inventaario'];

        // if ($scope.productid > 0) {
        //     where.productid = $scope.productid;
        // }

        $scope.storages = Storage.find();
        $scope.products = Product.find();

        if ($scope.storageid) {
            Storage.findById({'id': $scope.storageid})
            .$promise
            .then(function (data) {
                $scope.filters.storage = data;
                $scope.findTransfers();
            });
        }

        $scope.findTransfers = function () {
            var where = '';
            var filter = {};

            if ($scope.filters.storage) {
                var s = $scope.filters.storage;
                $scope.storageid = s.id;

                where = { 'or': [ {'fromstorageid': s.id}, {'tostorageid': s.id} ]};
            }

            if (where) {
                filter = {'filter': {'where': where}};
            }
            $scope.transfers = Transfer.find(filter);

            if ($scope.filters.storage) {
                $q.all([
                    $scope.products.$promise,
                    $scope.transfers.$promise
                ]).then(function () {
                    CurrentQtysService.setCurrentQtys($scope.transfers, $scope.products, $scope.filters.storage);
                });
            }
        };
        $scope.findTransfers();
    }
]);