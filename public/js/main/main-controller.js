'use strict';

ns('ec.main.module');

ec.main.MainCtrl = function($scope) {
  this.scope_ = $scope;
  this.scope_.expenses = [];
};
var MainCtrl = ec.main.MainCtrl;

MainCtrl.prototype.removeItem = function(index) {
  this.scope_.expenses.splice(index, 1);
};

MainCtrl.prototype.getPositiveOrNegativeAmount = function(amount, operation) {
  if (operation === '+') {
    return +amount;
  }
  return -amount;
};

MainCtrl.prototype.calculateTotal = function() {
  var self = this;
  var total = 0;
  var expense;
  var i;
  var len = self.scope_.expenses.length;
  for(i = 0; i < len; i++) {
    expense = self.scope_.expenses[i];
    if (expense.operation === '+' || expense.operation === '-') {
      total += expense.amount;
    }
    else if (expense.operation === '*') {
      total = total * expense.times;
    }
    else if (expense.operation === '/') {
      total = total / expense.split;
    }
  }

  return total;
};

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
    amount: self.getPositiveOrNegativeAmount(match[2], operation),
    description: match[3] || ''
  });

  self.scope_.item = '';
};
