angular.module('hkApp.controllers')
.controller('ProductsCtrl',
    ['$scope', '$http', '$routeParams', 'Product', 'Transfer',
    function  ($scope, $http, $routeParams, Product, Transfer) {
        $scope.product = {};

        $scope.products = [];

        $scope.getProducts = function () {
            Product.find()
                .$promise
                .then(function (data) {
                    $scope.products = data;

                    _($scope.products).forEach(function (i) {
                        i.qs = JSON.parse(i.qtys);
                    });
                });
        };
        $scope.getProducts();

        $scope.toggleActive = function (product) {
            product.active = !product.active;
            product.$save();
        };

        $scope.alerts = [];

        $scope.addProduct = function () {
            var p = $scope.product;

            if (p.name === '') {
                return;
            }

            var t = 'Lisätty: ' + p.name;

            p.qtys = '[{"n":"24","q":24},{"n":"2x24","q":48},{"n":"3x24","q":72}]';
            p.active = true;

            Product.create(p)
            .$promise
            .then(function (data, err) {
                if (err) {
                    $scope.alerts.push({time: moment(), msg: err});
                    return;
                }
                $scope.alerts.push({objid: data.id, type: 'success', time: moment(), msg: t});
                $scope.product.name = '';

                $scope.getProducts();
            });
        };

        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
        };

        $scope.undoAdd = function (id) {
            var index = _.findIndex($scope.alerts, ['objid', id]);

            Product.deleteById({ id: id })
             .$promise
             .then(function () {

                $scope.alerts[index].objid = 0;
                $scope.alerts[index].deleted = true;
                $scope.alerts[index].type = 'warning';

                $scope.getProducts();
            });
        };
    }
]);