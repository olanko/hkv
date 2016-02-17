/*global angular */
angular.module('hkApp', [
    'hkApp.controllers',
    'ngRoute',
    'ui.bootstrap',
    'lbServices',
    'angularMoment'
    //'ui.grid'
]).
config(function ($routeProvider, $locationProvider) {
    'use strict';
    $routeProvider.
    when('/transfers', {
      templateUrl: 'partials/transfers',
      controller: 'TransfersCtrl'
    }).
    when('/transfer', {
      templateUrl: 'partials/transfer',
      controller: 'TransferCtrl'
    }).
    when('/delivery', {
      templateUrl: 'partials/transfer',
      controller: 'TransferCtrl'
    }).
    when('/sales', {
      templateUrl: 'partials/transfer',
      controller: 'TransferCtrl'
    }).
    when('/inventory', {
      templateUrl: 'partials/transfer',
      controller: 'TransferCtrl'
    }).
    when('/products', {
      templateUrl: 'partials/products',
      controller: 'ProductsCtrl'
    }).
    when('/storage/:storageid', {
      templateUrl: 'partials/storage',
      controller: 'StorageCtrl'
    }).
    when('/', {
      templateUrl: 'partials/main',
      controller: 'MainCtrl'
    }).
    otherwise({
      redirectTo: '/'
    });

  $locationProvider.html5Mode(true);
}).run(function(amMoment) {
    'use strict';
    amMoment.changeLocale('fi');
});