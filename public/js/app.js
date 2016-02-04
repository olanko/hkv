
angular.module('hkApp', ['hkApp.controllers', 'ngRoute']).
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
    when('/', {
      templateUrl: 'partials/main',
      controller: 'MainCtrl'
    }).
    otherwise({
      redirectTo: '/'
    });

  $locationProvider.html5Mode(true);
});
