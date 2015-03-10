/**
 * @fileoverview The Main application controller.
 */

'use strict';

ns('ec.main.module');



/**
 * Main application controller.
 * @param {!angular.$scope} $scope Angular scope
 * @constructor
 * @export
 */
ec.main.MainCtrl = function($scope) {
  /** @private {!angular.$scope} */
  this.scope_ = $scope;

  /** @type {Array} */
  this.scope_.expenses = [];
};
var MainCtrl = ec.main.MainCtrl;


/**
 * Removes the item in the given positon from the expenses array.
 * @param {Number} index
 */
MainCtrl.prototype.removeItem = function(index) {
  this.scope_.expenses.splice(index, 1);
};


/**
 * Verifies the right amount to be returned based on the given operation.
 * @param {Number} amount
 * @param {String} operation
 * @return {number} The amount.
 * @private
 */
MainCtrl.prototype.getPositiveOrNegativeAmount_ = function(amount, operation) {
  if (operation === '+') {
    return +amount;
  }
  return -amount;
};


/**
 * Calculates the expenses total.
 * @return {number} The total.
 */
MainCtrl.prototype.calculateTotal = function() {
  var self = this;
  var total = 0;
  var expense;
  var i;
  var len = self.scope_.expenses.length;
  for (i = 0; i < len; i++) {
    expense = self.scope_.expenses[i];
    if (expense.operation === '+' || expense.operation === '-') {
      total += expense.amount;
    } else if (expense.operation === '*') {
      total = total * expense.times;
    } else if (expense.operation === '/') {
      total = total / expense.split;
    }
  }

  return total;
};


/**
 * Adds the item to expense list. The expense description and amount is
 * extracted using a regular expression.
 * Example of a valid items:
 *   12 Noodles     = Noodles $12
 *   50.25 Beers    = Beers $50.25
 *   /2             = Split total by 2
 *   *5             = Multiply total by 5
 *   =              = Show Total
 *
 * @param {String} item The item.
 */
MainCtrl.prototype.addItem = function(item) {

  var regex = /(\+|\-|\/|\*|=|x)?\s?(\d*\.?\d+)?(.*)/;
  var self = this;

  if (!item || item.trim === '') {
    return;
  }

  var match = item.match(regex);
  var operation = match[1] || '+';
  var len;

  if (operation === '=') {
    self.scope_.expenses.push({
      operation: operation,
      amount: self.calculateTotal(),
      description: 'Total'
    });
    self.scope_.item = '';
    return;
  }

  if (operation === '/') {
    self.scope_.expenses.push({
      operation: operation,
      split: +match[2],
      description: 'Split by ' + match[2]
    });
    len = self.scope_.expenses.length - 1;
    self.scope_.expenses[len].amount = self.calculateTotal();
    self.scope_.item = '';
    return;
  }

  if (operation === '*' || operation.toLowerCase() === 'x') {
    self.scope_.expenses.push({
      operation: '*',
      times: +match[2],
      description: 'Times ' + match[2]
    });
    len = self.scope_.expenses.length - 1;
    self.scope_.expenses[len].amount = self.calculateTotal();
    self.scope_.item = '';
    return;
  }

  self.scope_.expenses.push({
    operation: operation,
    amount: self.getPositiveOrNegativeAmount_(match[2], operation),
    description: match[3] || ''
  });

  self.scope_.item = '';
};
