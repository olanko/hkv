/*global angular */
angular.module('hkApp', [
    'hkApp.controllers',
    'ngRoute',
    'ui.bootstrap',
    'lbServices',
    'angularMoment'
    //'ui.grid'
]).
config(function ($routeProvider, $locationProvider, $httpProvider) {
    'use strict';
    $routeProvider.
    when('/transfers', {
      templateUrl: 'html/transfers.html',
      controller: 'TransfersCtrl'
    }).
    when('/transfer', {
      templateUrl: 'html/transfer.html',
      controller: 'TransferCtrl'
    }).
    when('/delivery', {
      templateUrl: 'html/transfer.html',
      controller: 'TransferCtrl'
    }).
    when('/sales', {
      templateUrl: 'html/transfer.html',
      controller: 'TransferCtrl'
    }).
    when('/inventory', {
      templateUrl: 'html/transfer.html',
      controller: 'TransferCtrl'
    }).
    when('/products', {
      templateUrl: 'html/products.html',
      controller: 'ProductsCtrl'
    }).
    when('/storage/:storageid', {
      templateUrl: 'html/storage.html',
      controller: 'StorageCtrl'
    }).
    when('/login', {
      templateUrl: 'html/login.html',
      controller: 'LoginCtrl'
    }).
    when('/', {
      templateUrl: 'html/main.html',
      controller: 'MainCtrl'
    }).
    otherwise({
      redirectTo: '/'
    });

    $locationProvider.html5Mode(true);

    $httpProvider.interceptors.push(function($q, $location, LoopBackAuth) {
      return {
        responseError: function(rejection) {
          if (rejection.status == 401) {
            //Now clearing the loopback values from client browser for safe logout...
            LoopBackAuth.clearUser();
            LoopBackAuth.clearStorage();
            if ($location.path() !== '/login') {
                $location.nextAfterLogin = $location.path();
                $location.path('/login');
            }
          }
          return $q.reject(rejection);
        }
      };
    });
}).run(function(amMoment) {
    'use strict';
    amMoment.changeLocale('fi');
});