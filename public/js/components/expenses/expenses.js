'use strict';

/**
 * @fileoverview Angular directive that contains the logic for calling the
 * expenses list.
 */

ns('ec.expenses');

/**
 * Defines the 'expenses' module, which exports the expenses directive.
 * @type {!angular.Module}
 */
ec.expenses.module = angular.module('ec.expenses', []).
    directive(ec.expenses.EXPENSES_DIRECTIVE_NAME,
      ec.expenses.expensesDirective).
    directive(ec.expenses.EXPENSE_LINE_DIRECTIVE_NAME,
      ec.expenses.expenseLineDirective);
