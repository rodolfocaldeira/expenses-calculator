'use strict';

/**
 * @fileoverview Angular directive that contains the logic for expense line.
 */

ns('ec.expenses');


/**
 * Name that the directive will be registered with.
 * @export
 * @type {string}
 */
ec.expenses.EXPENSE_LINE_DIRECTIVE_NAME = 'ecExpenseLine';


/**
 * @return {angular.Directive} Directive definition object.
 */
ec.expenses.expenseLineDirective = function() {
  return {
    scope: {
      expense: '=',
      remove: '&'
    },
    link: function(scope, element, attrs) {
      scope.getOperationStyle = function(operation) {
        if (operation === '=') {
          return 'total';
        } else if (operation === '/') {
          return 'split';
        }
        return 'description';
      };
    },
    templateUrl: 'js/components/expenses/expense-line.html'
  };
};
