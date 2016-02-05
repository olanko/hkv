angular.module('hkApp.controllers', [])
.controller('MainCtrl', function  ($scope, $http) {
    $http.get('/api/products')
        .success(function (data) {
            $scope.products = data.products;

            console.log(data);
        });
})

.controller('TransferCtrl', ['$scope', '$http', function  ($scope, $http) {
    $scope.newtransfer = {
        stofrom: {},
        stodest: {},
        product: {},
        qty: 0
    };

    $scope.alerts = [];

    $http.get('/api/products')
        .success(function (data) {
            $scope.products = data;
            $scope.newtransfer.product = $scope.products[0];

            $scope.changeProduct();
        });
    $http.get('/api/storages')
        .success(function (data) {
            $scope.storages = data;

            $scope.newtransfer.stofrom = $scope.storages[0];
            $scope.newtransfer.stodest = $scope.storages[1];
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

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };

    $scope.addTransfer = function () {
        var n = $scope.newtransfer;
        var t = 'Siirretty ' + n.qty + ' ' + n.product.name + ' ' + n.stofrom.name + ' -> ' + n.stodest.name;

        $scope.alerts.push({time: moment(), msg: t});
    };
}])

.controller('TransfersCtrl', function  ($scope, $http) {
    $http.get('/api/transfers')
        .success(function (data) {
            $scope.transfers = data.transfers;
        });
});