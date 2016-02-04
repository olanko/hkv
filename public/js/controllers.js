angular.module('hkApp.controllers', [])
.controller('MainCtrl', function  ($scope, $http) {
    $http.get('/api/products')
        .success(function (data) {
            $scope.products = data.products;

            console.log(data);
        });
})

.controller('TransferCtrl', function  ($scope, $http) {
    $http.get('/api/products')
        .success(function (data) {
            $scope.products = data;
            $scope.product = $scope.products[0];
        });
    $http.get('/api/storages')
        .success(function (data) {
            $scope.storages = data;
        });

    $scope.changeProduct = function () {
        var p = $scope.products[$scope.product];
        $scope.qtys = JSON.parse(p.qtys);

        $scope.quickQty = $scope.qtys[0].q;
        $scope.qty = $scope.qtys[0].q;
    };

    $scope.changeQuickQty = function (q) {
        alert($scope.quickQty);
    };
})

.controller('TransfersCtrl', function  ($scope, $http) {
    $http.get('/api/transfers')
        .success(function (data) {
            $scope.transfers = data.transfers;
        });
});