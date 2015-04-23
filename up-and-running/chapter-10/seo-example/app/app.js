angular.module('SeoApp', ['ngRoute'])
  .config(['$locationProvider', '$routeProvider'], function($locationProvider, $routeProvider) {
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');

    $routeProvider.when('/', {
      templateUrl: 'root.html'
    })
    .when('/first/page', {
      templateUrl: 'first.html'
    })
    .when('/second/page', {
      templateUrl: 'second.html'
    });


    $routeProvider.otherwise({
      redirectTo: '/'
    });
  });
