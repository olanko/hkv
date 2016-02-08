angular.module('hkApp.controllers')
.controller('TransferCtrl', ['$scope', '$http', '$routeParams', 'Transfer',
    function  ($scope, $http, $routeParams, Transfer) {
    $scope.newtransfer = {
        stofrom: {},
        stodest: {},
        product: {},
        relative: 0,
        absolute: 0,
        qty: 0
    };

    $scope.config = {
        useAbsolute: false
    };

    $scope.types = ['Siirto', 'Toimitus', 'Myynti', 'Inventaario'];
    $scope.type = 0;
    if ($routeParams.type > 0) {
        $scope.type = $routeParams.type;
    }
    console.log($scope.type);

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

    $scope.undoTransfer = function (id) {
        var index = _.findIndex($scope.alerts, ['transferid', id]);

        Transfer.deleteById({ id: id })
         .$promise
         .then(function () {

            $scope.alerts[index].transferid = 0;
            $scope.alerts[index].deleted = true;
            $scope.alerts[index].type = 'warning';
        });
    };

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };

    $scope.addTransfer = function () {
        var n = $scope.newtransfer;

        var t = '' + n.qty + ' ' + n.product.name + ' ' + n.stofrom.name + ' -> ' + n.stodest.name;

        var absolute = 0;
        var relative = n.qty;
        if ($scope.config.useAbsolute) {
            absolute = qty;
            relative = 0;
        }

        Transfer.create({
            "fromstorageid": n.stofrom.id,
            "tostorageid": n.stodest.id,
            "productid": n.product.id,
            "user": 0,
            "absolute": absolute,
            "relative": relative,
            "comment": "",
            "type": $scope.type
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
            $scope.alerts.push({transferid: transfer.id, type: 'success', time: moment(), msg: t});
        });


    };
}]);