angular.module('hkApp.controllers')
.controller('TransfersCtrl',
    ['$scope', '$http', 'Storage', 'Transfer',
    function  ($scope, $http, Storage, Transfer) {
        $scope.transfers = [];
        $scope.storages = [];
        $scope.datenow = moment();

        Transfer.find()
            .$promise
            .then(function (data) {
                $scope.transfers = data;
            });

        Storage.find()
            .$promise
            .then(function (data) {
                $scope.storages = data;
            });
    }
]);