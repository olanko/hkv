angular.module('hkApp.controllers')
.controller('StorageCtrl',
    ['$scope', '$routeParams', '$q', 'Storage', 'Product', 'Transfer',
    function  ($scope, $routeParams, $q, Storage, Product, Transfer) {
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

        /* Find current qtys or all products */
        $scope.transfers
            .$promise
            .then(function (data) {
                for (var i = 0; i < data.length; i++) {
                    /* Delivery */
                    if (data[i].type == 3) {
                        data[i].runningvalue = data[i].absolute;

                        /* If first absolute value or value matches running value, then fine. */
                        if (!runningvalues[data[i].productid] || runningvalues[data[i].productid] == data[i].absolute) {
                            data[i].class = 'bg-success';
                        } else {
                            data[i].class = 'bg-danger';
                        }
                        runningvalues[data[i].productid] = 1.0 * data[i].absolute;
                    } else {
                        if (!runningvalues[data[i].productid]) {
                            runningvalues[data[i].productid] = 0;
                            data[i].runningvalue = 0;
                        }

                        data[i].change = 0;

                        /* Transfer and delivery */
                        if (data[i].type === 0 || data[i].type === 1) {
                            if (data[i].fromstorageid == $scope.storage.id) {
                                data[i].change += -1.0 * data[i].relative;

                            }
                            if (data[i].tostorageid == $scope.storage.id) {
                                data[i].change += 1.0 * data[i].relative;
                            }
                        }

                        /* Sales */
                        if (data[i].type === 2) {
                            data[i].change += 1.0 * data[i].relative;
                        }

                        runningvalues[data[i].productid] += data[i].change;
                        data[i].runningvalue = runningvalues[data[i].productid];
                    }
                }
                $scope.transfers = data;

                /* Populate products current values ater products loaded. */
                $scope.products.$promise.then(function (data) {
                    angular.forEach($scope.products, function (value, key) {
                        $scope.products.current = runningvalues[value['id']];
                    });
                });
            });


}]);