/*global angular */
angular.module('hkApp.controllers')
.controller('ProductReportCtrl',
    ['$scope', '$routeParams', '$q', 'Storage', 'Product', 'Transfer', 'CurrentQtysService',
    function  ($scope, $routeParams, $q, Storage, Product, Transfer, CurrentQtysService) {
        var productid = $routeParams.productid;

        $scope.types = ['Siirto', 'Toimitus', 'Myynti', 'Inventaario'];

        $scope.filters = {};
        $scope.filters.storage = {};
        $scope.storages = [];
        $scope.filters.product = {};
        $scope.products = [];
        $scope.transfers = [];

        Product.findById({'id': productid})
            .$promise
            .then(function (data) {
                $scope.filters.product = data;
            });

        $scope.storages = Storage.find();
    }
]);