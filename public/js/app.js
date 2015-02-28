'use strict';

ns('ecalc.application.module');

ecalc.application.config = function($routeProvider) {
  $routeProvider.
      when('/', {
        templateUrl: 'js/main/main.html',
        controller: 'MainCtrl',
        controllerAs: 'mainCtrl'
      }).
      otherwise({redirectTo: '/'});
};

ecalc.application.module = angular.module('ecalcApp', [
  'ngRoute',
  'ngSanitize',
  'app.expenses'
]);

ecalc.application.module.config(ecalc.application.config);

// register all controllers
ecalc.application.module.controller('MainCtrl', ecalc.main.MainCtrl);



