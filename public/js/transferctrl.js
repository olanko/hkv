/*global angular */
angular.module('hkApp.controllers')
.controller('TransferCtrl',
    ['$scope', '$http', '$routeParams', '$location', '$q', 'Product', 'Storage', 'Transfer',
    function  ($scope, $http, $routeParams, $location, $q, Product, Storage, Transfer) {
    $scope.newtransfer = {};
    $scope.alerts = [];

    var options = $scope.options = {
        useAbsolute: false,
        useNegative: false,
        fromStorageType: 0,
        showFromStorage: true,
        showToStorage: true,
        showStorageLabels: true,
        showWaste: false
    };

    $scope.actions = {
        '/transfer': {
            caption: '',
            submitCaption: 'Siirrä',
            type: 0,
            initOptions: function () {
                options.showWaste = true;
            },
            initData: function () {
                $scope.newtransfer.stofrom = $scope.newtransfer.stofrom || $scope.storages[0];
                $scope.newtransfer.stodest = $scope.newtransfer.stodest || $scope.storages[1];
            },
            preAdd: function () {},
            alert: function (n) {
                return '' + n.qty + ' ' + n.product.name + ' ' + n.stofrom.name + ' -> ' + n.stodest.name;
            }
        },
        '/delivery': {
            caption: 'Toimitus varastoon',
            submitCaption: 'Lisää',
            type: 1,
            initOptions: function () {
                options.fromStorageType = 1;
                options.showToStorage = false;
            },
            initData: function () {
                $scope.newtransfer.stofrom = $scope.newtransfer.stofrom || $scope.storages[0];

                /* Find main storage */
                Storage.findById({ id: 0 })
                .$promise
                .then(function (data) {
                    $scope.newtransfer.stodest = data;
                });
            },
            preAdd: function () {},
            alert: function (n) {
                return 'Lisätty' + n.qty + ' ' + n.product.name + ' -> ' + n.stodest.name;
            }

        },
        '/sales': {
            caption: 'Myynti',
            submitCaption: 'Lisää',
            type: 2,
            initOptions: function () {
                options.useNegative = true;
                options.showToStorage = false;
            },
            initData: function () {
                /* Find pseudo sales storage */
                Storage.findById({ id: 10 })
                .$promise
                .then(function (data) {
                    $scope.newtransfer.stodest = data;
                });
                $scope.newtransfer.stofrom = $scope.newtransfer.stofrom || $scope.storages[0];
            },
            preAdd: function () {},
            alert: function (n) {
                return 'Lisätty myynti ' + n.qty + ' ' + n.product.name + ' ' + n.stofrom.name;
            }

        },
        '/inventory': {
            caption: 'Inventaario',
            submitCaption: 'Kirjaa',
            type: 3,
            initOptions: function () {
                options.useAbsolute = true;
                options.showFromStorage = true;
                options.showToStorage = false;
                options.showStorageLabels = false;
            },
            initData: function () {
                $scope.newtransfer.stofrom = $scope.newtransfer.stofrom || $scope.storages[0];
            },
            preAdd: function () {
                $scope.newtransfer.stodest = $scope.newtransfer.stofrom;
            },
            alert: function (n) {
                return '' + n.product.name + ' ' + n.stofrom.name + ' määrä ' + n.qty;
            }
        }
    };

    if ($scope.actions[$location.path()]) {
        $scope.action = $scope.actions[$location.path()];
    } else {
        $scope.action = $scope.actions['/transfer'];
    }
    $scope.action.initOptions();

    $q.all([
        Product.find().$promise,
        Storage.find({filter: {where: {'or': [{'type': options.fromStorageType}, {'type': 2} ]}}}).$promise
    ]).then(function (data) {
        console.log(data);
        $scope.products = data[0];
        _($scope.products).forEach(function (i) {
            i.qs = JSON.parse(i.qtys);
        });
        $scope.newtransfer.product = $scope.products[0];
        $scope.changeProduct();

        $scope.storages = data[1];

        $scope.action.initData();
    });

    $scope.changeProduct = function () {
        var p = $scope.newtransfer.product;
        $scope.changeQuickQty(p.qs[0].q);
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

        /* Call pre-add method of action. */
        $scope.action.preAdd();

        var t = $scope.action.alert(n);

        var absolute = 0;
        var relative = n.qty;
        if (options.useAbsolute) {
            absolute = n.qty;
            relative = 0;
        }
        var factor = 1.0;
        if (options.useNegative) {
            factor = -1.0;
        }

        Transfer.create({
            "fromstorageid": n.stofrom.id,
            "tostorageid": n.stodest.id,
            "productid": n.product.id,
            "user": 0,
            "absolute": factor * absolute,
            "relative": factor * relative,
            "comment": n.comment,
            "type": $scope.action.type
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
            $scope.newtransfer.comment = '';
        });


    };
}]);