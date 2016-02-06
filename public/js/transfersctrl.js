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

        $scope.types = ['Siirto', 'Toimitus', 'Myynti', 'Inventaario'];

        var where = {};
        if ($scope.storageid > 0) {

            where.tostorageid = $scope.storageid;
        }
        if ($scope.productid > 0) {
            where.productid = $scope.productid;
        }

        console.log(where);

        //{ filter: { where: { tostorageid: 1 }} }

        Transfer.find()
            .$promise
            .then(function (data) {
                $scope.transfers = data;
            });

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