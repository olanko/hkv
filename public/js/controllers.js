angular.module('hkApp.controllers', [])
.controller('MainCtrl', function  ($scope, $http) {
    $http.get('/api/products')
        .success(function (data) {
            $scope.products = data.products;

            console.log(data);
        });
})

.controller('TransferCtrl', function  ($scope, $http) {
    $scope.newtransfer = {
        sto_from: 0,
        sto_dest: 1
    };

    $http.get('/api/products')
        .success(function (data) {
            $scope.products = data;
            $scope.newtransfer.product = $scope.products[0];

            $scope.changeProduct();
        });
    $http.get('/api/storages')
        .success(function (data) {
            $scope.storages = data;

            $scope.newtransfer.sto_from = $scope.storages[0];
            $scope.newtransfer.sto_dest = $scope.storages[1];
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
        var n = $scope.newtransfer;
        var t = 'Siirretty ' + n.qty + ' ' + n.product.name + ' ' + n.sto_from.name + ' -> ' + n.sto_dest.name;
        $('#alerttext').html(t);
        $('#alerttext').show();
    };
})

.controller('TransfersCtrl', function  ($scope, $http) {
    $http.get('/api/transfers')
        .success(function (data) {
            $scope.transfers = data.transfers;
        });
});