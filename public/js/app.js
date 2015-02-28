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

ecalc.application.module.filter('expenseFilter', function($filter) {
  return function(expense) {

    var currencyFilter = $filter('currency');
    var amount = currencyFilter(expense.amount, "€");

    if (expense.operation === '=') {
      return '<div class="total">' +
          '<span class="description">' + expense.description + '</span> '
          + '<span class="amount">' + amount + '</span>'
          + '</div>';
    }

    if (expense.operation === '/') {
      return '<div class="split">' +
          '<span class="description">' + expense.description + '</span> '
          + '<span class="amount">' + amount + '</span>'
          + '</div>';
    }

    return '<span class="description">' + expense.description + '</span> '
        + '<span class="amount">' + amount + '</span>';
  }
});

