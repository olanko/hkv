angular.module('hkApp.controllers')
.controller('TransferCtrl', ['$scope', '$http', 'Transfer', function  ($scope, $http, Transfer) {
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

        $scope.changeQuickQty(q);
    };

    $scope.changeQuickQty = function (q) {
        $scope.newtransfer.qty = q;
    };

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };

    $scope.addTransfer = function () {
        var n = $scope.newtransfer;

        var t = 'Siirretty ' + n.qty + ' ' + n.product.name + ' ' + n.stofrom.name + ' -> ' + n.stodest.name;

        Transfer.create({
            "fromstorageid": n.stofrom.id,
            "tostorageid": n.stodest.id,
            "productid": n.product.id,
            "user": 0,
            "absolute": 0,
            "relative": n.qty,
            "comment": "",
            "type": 0
            //"id": 0,
            //"inserttime": "string",
            //"transfertime": "string"
        })
        .$promise
        .then(function (transfer, err) {
            if (err) {
                $scope.alerts.push({time: moment(), msg: err});
                return;
            }
            $scope.alerts.push({time: moment(), msg: t});
        });


    };
}]);