angular.module('hkApp.controllers')
.controller('ProductsCtrl',
    ['$scope', '$http', '$routeParams', 'Product', 'Transfer',
    function  ($scope, $http, $routeParams, Product, Transfer) {
        $scope.products = [];


        Product.find()
            .$promise
            .then(function (data) {
                $scope.products = data;
            });
    }
]);