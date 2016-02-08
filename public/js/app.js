
angular.module('hkApp', [
    'hkApp.controllers',
    'ngRoute',
    'ui.bootstrap',
    'lbServices',
    'angularMoment'
]).
config(function ($routeProvider, $locationProvider) {
  $routeProvider.
    when('/transfers', {
      templateUrl: 'partials/transfers',
      controller: 'TransfersCtrl'
    }).
    when('/transfer', {
      templateUrl: 'partials/transfer',
      controller: 'TransferCtrl'
    }).
    when('/products', {
      templateUrl: 'partials/products',
      controller: 'ProductsCtrl'
    }).
    when('/storages', {
      templateUrl: 'partials/storages',
      controller: 'StoragesCtrl'
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
    amMoment.changeLocale('fi');
});