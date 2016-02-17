/*global angular */
angular.module('hkApp.controllers')
.controller('StorageCtrl',
    ['$scope', '$routeParams', '$q', 'Storage', 'Product', 'Transfer', 'CurrentQtysService',
    function  ($scope, $routeParams, $q, Storage, Product, Transfer, CurrentQtysService) {
        var storageid = $routeParams.storageid;

        $scope.types = ['Siirto', 'Toimitus', 'Myynti', 'Inventaario'];

        $scope.filters = {};
        $scope.filters.storage = {};
        $scope.storages = [];
        $scope.filters.product = {};
        $scope.products = [];
        $scope.transfers = [];

        Storage.findById({'id': storageid})
            .$promise
            .then(function (data) {
                $scope.filters.storage = data;
                $scope.findProducts();
            });


        $scope.storages = Storage.find();

        $scope.changeStorage = function (storageid) {
            $scope.filters.storage = _.find($scope.storages, {'id' : storageid});
            $scope.findProducts();
        };

        $scope.findProducts = function () {
            $scope.transfers = [];

            var sid = $scope.filters.storage.id;

            var productsPromise = Product.find();
            productsPromise
                .$promise
                .then(function (data) {
                    $scope.products = data;
                });

            var where = { 'or': [ {'fromstorageid': sid}, {'tostorageid': sid} ]};
            var filter = {'filter': {'where': where, 'order': 'transfertime'}};

            $scope.transfers = Transfer.find(filter);

            var runningvalues = {};

            $q.all([
                $scope.products.$promise,
                $scope.transfers.$promise
            ]).then(function () {
                CurrentQtysService.setCurrentQtys($scope.transfers, $scope.products, $scope.filters.storage);
            });
        };

        $scope.addInventoryOK = function (storage, product) {
            if (!storage || !product) {
                return;
            }

            Transfer.create({
                "fromstorageid": storage.id,
                "tostorageid": storage.id,
                "productid": product.id,
                "user": 0,
                "absolute": product.currentqty,
                "relative": 0,
                "comment": '',
                "type": 3 // Inventory
            })
            .$promise
            .then(function (transfer, err) {
                product.isOK = true;
            });
        };
}]);