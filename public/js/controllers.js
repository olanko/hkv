/* jshint esversion: 6 */

(function () {
    "use strict";

    angular.module('hkApp.controllers', [])

    .controller('MainCtrl', ['$scope', '$http', '$q', 'Storage', function  ($scope, $http, $q, Storage) {
        $http.get('/api/storages')
            .success(function (data) {
                $scope.storages = data;
            });

            $q.all([
                Storage.transfersto({ 'id': 0 }).$promise,
                Storage.transfersfrom({ 'id': 0 }).$promise
            ])
            .then(function (data) {
                var transfers = _.unionBy(data[0], data[1], 'id');

                var transfers2 = _(_.unionBy(data[0], data[1], 'id'))
                    .sortBy('transfertime')
                    .map(o => { return { transfertime: o.transfertime, id: o.id, type: o.type }; })
                    .forEach(o => { console.log(o.transfertime);});

                console.log(transfers);
                console.log(transfers2);
            });

            var f = () => { console.log('jee'); };
            f();



            function foo(){
                  let a = 4;
                  alert(a);
                }
                foo();
    }]);
})();