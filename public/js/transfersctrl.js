angular.module('hkApp.controllers')
.controller('TransfersCtrl',
    ['$scope', '$http', 'Storage', 'Product', 'Transfer',
    function  ($scope, $http, Storage, Product, Transfer) {
        $scope.transfers = [];
        $scope.storages = [];
        $scope.products = [];
        $scope.datenow = moment();

        $scope.types = ['Siirto', 'Toimitus', 'Myynti'];

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