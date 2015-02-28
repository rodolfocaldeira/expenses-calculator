'use strict';

/**
 * @fileoverview Angular directive that contains the logic for calling the
 * expenses list.
 */

ns('ec.expenses');

/**
 * Name that the directive will be registered with.
 * @export
 * @type {string}
 */
ec.expenses.EXPENSES_DIRECTIVE_NAME = 'rodiExpenses';

/**
 * @return {angular.Directive} Directive definition object.
 */
ec.expenses.expensesDirective = function() {
  return {
    scope: {},

    link: function(scope, element, attrs) {
      scope.clicky = function() {
        console.log('Hello World');
      }
    },
    templateUrl: 'js/components/expenses/expenses.html'
  };
};


ec.expenses.expensesItem = function() {
  return {
    scope: {
      expense: '='
    },
    link: function(scope, element, attrs) {
      scope.getOperationStyle = function(operation) {
        if(operation === '=') {
          return 'total';
        } else if(operation === '/') {
          return 'split'
        }
        return 'description';
      };
    },
    templateUrl: 'js/components/expenses/expense-item.html'
  };
};

/**
 * Defines the 'expenses' module, which exports the expenses directive.
 * @type {!angular.Module}
 */
ec.expenses.module = angular.module('app.expenses', []).
    directive(ec.expenses.EXPENSES_DIRECTIVE_NAME, ec.expenses.expensesDirective).
    directive('ecExpenseItem', ec.expenses.expensesItem);