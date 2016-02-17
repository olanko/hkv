/*jslint nomen:true */
/*globals angular,moment,_ */
angular.module('hkApp.controllers')
.controller('ProductsCtrl',
    ['$scope', 'Product',
    function  ($scope, Product) {
        'use strict';
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
            var p = $scope.product, t, q, n, i;

            if (p.name === '') {
                return;
            }

            t = 'Lisätty: ' + p.name;

            q = [];
            n = p.unitqty;

            q.push({'n': n, 'q': n});
            for (i = 2; i <= 4; i += 1) {
                q.push({'n': i + 'x' + n, 'q': i*n});
            }

            p.qtys = JSON.stringify(q);
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