angular.module('hkApp.controllers')
.controller('StorageCtrl',
    ['$scope', '$routeParams', '$q', 'Storage', 'Product', 'Transfer', 'CurrentQtysService',
    function  ($scope, $routeParams, $q, Storage, Product, Transfer, CurrentQtysService) {
        var storageid = $routeParams.storageid;

        $scope.types = ['Siirto', 'Toimitus', 'Myynti', 'Inventaario'];

        $scope.storage = {};
        $scope.storages = [];
        $scope.product = {};
        $scope.products = [];
        $scope.transfers = [];

        var where = { 'or': [ {'fromstorageid': storageid}, {'tostorageid': storageid} ]};
        var filter = {'filter': {'where': where, 'order': 'transfertime'}};

        $scope.storage = Storage.findById({'id': storageid});
        $scope.storages = Storage.find();

        $scope.products = Product.find();
        $scope.products
            .$promise
            .then(function (data) {
                $scope.product = data[0];
            });

        $scope.transfers = Transfer.find(filter);

        var runningvalues = {};

        $q.all([
            $scope.products.$promise,
            $scope.transfers.$promise
        ]).then(function () {
            CurrentQtysService.setCurrentQtys($scope.transfers, $scope.products, $scope.storage);
        });
}]);