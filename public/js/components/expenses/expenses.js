'use strict';

ns('ec.expenses');

/**
 * Defines the 'expenses' module, which exports expenses and expense
 * line directives.
 * @type {!angular.Module}
 */
ec.expenses.module = angular.module('ec.expenses', []).
    directive(ec.expenses.EXPENSES_DIRECTIVE_NAME,
      ec.expenses.expensesDirective).
    directive(ec.expenses.EXPENSE_LINE_DIRECTIVE_NAME,
      ec.expenses.expenseLineDirective);
