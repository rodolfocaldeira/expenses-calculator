/**
 * @fileoverview Angular directive that contains the logic for calling the
 * expenses list.
 */
ns('app.expenses');

/**
 * Name that the directive will be registered with.
 * @export
 * @type {string}
 */
app.expenses.EXPENSES_DIRECTIVE_NAME = 'rodiExpenses';

/**
 * @return {angular.Directive} Directive definition object.
 */
app.expenses.expensesDirective = function() {
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


app.expenses.expensesItem = function() {
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
app.expenses.module = angular.module('app.expenses', []).
    directive(app.expenses.EXPENSES_DIRECTIVE_NAME, app.expenses.expensesDirective).
    directive('ecExpenseItem', app.expenses.expensesItem);