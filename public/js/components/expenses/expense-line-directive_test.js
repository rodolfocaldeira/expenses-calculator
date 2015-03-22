'use strict';

describe('expense-line-directive', function() {
  var el, stubRemove;

  beforeEach(module('ec.expenses'));
  beforeEach(module('js/components/expenses/expense-line.html'));
  beforeEach(inject(function($compile, $rootScope) {
    // set up scope
    var scope = $rootScope;
    scope.expense = {
      operation: '=',
      description: 'Expense description',
      amount: 100
    };
    stubRemove = sinon.stub();
    scope.remove = stubRemove;

    // create and compile directive
    el = angular.element(
        '<ec-expense-line expense="expense" remove="remove({index: 1})"/>');
    $compile(el)(scope);
    //console.log(el[0].outerHTML);
    scope.$digest();
  }));

  it('should bind the data', function() {
    // https://docs.angularjs.org/api/ng/function/angular.element
    expect(el.find('.description').text()).toContain('Expense description');
    expect(el.find('.amount').text()).toContain('100');
    expect(el.find('div').hasClass('total')).toBe(true);
  });

  it('should bind to the event', function() {
    el.find('div').triggerHandler('click'); // or el.find("div").click();
    // http://sinonjs.org/docs/
    expect(stubRemove.called).toBe(true);
    expect(stubRemove.calledWith({index: 1})).toBe(true);
  });

});
