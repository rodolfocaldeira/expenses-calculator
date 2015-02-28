'use strict';

ns('ec.application.module');

ec.application.config = function($routeProvider) {
  $routeProvider.
      when('/', {
        templateUrl: 'js/main/main.html',
        controller: 'MainCtrl',
        controllerAs: 'mainCtrl'
      }).
      otherwise({redirectTo: '/'});
};

ec.application.module = angular.module('ecApp', [
  'ngRoute',
  'ngSanitize',
  ec.expenses.module.name,
  ec.footer.module.name
]);

ec.application.module.config(ec.application.config);

// register all controllers
ec.application.module.controller('MainCtrl', ec.main.MainCtrl);
