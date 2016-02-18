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
    when('/', {
      templateUrl: 'html/main.html',
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