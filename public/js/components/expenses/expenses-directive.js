'use strict';

/**
 * @fileoverview Angular directive that contains the logic for expenses list.
 */

ns('ec.expenses');


/**
 * Name that the directive will be registered with.
 * @export
 * @type {string}
 */
ec.expenses.EXPENSES_DIRECTIVE_NAME = 'ecExpenses';


/**
 * @return {angular.Directive} Directive definition object.
 */
ec.expenses.expensesDirective = function() {
  return {
    scope: {
      expenses: '=',
      remove: '&'
    },
    templateUrl: 'js/components/expenses/expenses-directive.html'
  };
};
