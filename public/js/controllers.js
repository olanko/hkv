angular.module('hkApp.controllers', [])
.controller('MainCtrl', function  ($scope, $http) {
    $http.get('/api/products')
        .success(function (data) {
            $scope.products = data.products;

            console.log(data);
        });
})

.controller('TransferCtrl', function  ($scope, $http) {
    $scope.newtransfer = {};

    $http.get('/api/products')
        .success(function (data) {
            $scope.products = data;
            $scope.newtransfer.product = $scope.products[0];

            $scope.changeProduct();
        });
    $http.get('/api/storages')
        .success(function (data) {
            $scope.storages = data;
        });

    $scope.changeProduct = function () {
        var p = $scope.newtransfer.product;
        $scope.qtys = JSON.parse(p.qtys);

        var q = $scope.qtys[0].q;
        $scope.newtransfer.qty = q;
    };

    $scope.changeQuickQty = function (q, e) {
        $scope.newtransfer.qty = q;

        console.log(e);
    };

    $scope.addTransfer = function () {
        $scope.alerttext = $scope.newtransfer.qty;
    };
})

.controller('TransfersCtrl', function  ($scope, $http) {
    $http.get('/api/transfers')
        .success(function (data) {
            $scope.transfers = data.transfers;
        });
});