/**
 * @fileoverview Angular directive that contains the logic for calling the
 * Google Feedback api.
 */

window.app = window.app || {};
window.app.expenses = window.app.expeneses || {};

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

/**
 * Defines the 'expenses' module, which exports the expenses directive.
 * @type {!angular.Module}
 */
app.expenses.module = angular.module('app.expenses', []).directive(
    app.expenses.EXPENSES_DIRECTIVE_NAME, app.expenses.expensesDirective);
