angular.module('hkApp.controllers')
.controller('TransfersCtrl',
    ['$scope', '$http', '$routeParams', 'Storage', 'Product', 'Transfer',
    function  ($scope, $http, $routeParams, Storage, Product, Transfer) {
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

        $scope.findTransfers = function () {
            var where = '';
            var filter = {};
            if ($scope.filters.storage) {
                var s = $scope.filters.storage;

                where = { 'or': [ {'fromstorageid': s.id}, {'tostorageid': s.id} ]};
            }

            if (where) {
                filter = {'filter': {'where': where}};
            }
            Transfer.find(filter)
                .$promise
                .then(function (data) {
                    $scope.transfers = data;
                });
            };
        $scope.findTransfers();

        Storage.find()
            .$promise
            .then(function (data) {
                /* Make array index match id:s */
                _(data).forEach(function (i) {
                    $scope.storages[i.id] = i;
                });
            });

        Product.find()
            .$promise
            .then(function (data) {
                /* Make array index match id:s */
                _(data).forEach(function (i) {
                    $scope.products[i.id] = i;
                });
            });
    }
]);