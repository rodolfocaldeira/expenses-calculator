/**
 * @fileoverview Tests for the Main application controller.
 */

describe('MainCtrl', function() {

  var $scope, $controller;

  beforeEach(function() {
    module(ec.application.module.name);
    inject(function($injector) {
      var $rootScope = $injector.get('$rootScope');
      $scope = $rootScope.$new();
      $controller = $injector.get('$controller');
    });
  });


  describe('getPositiveOrNegativeAmount_', function() {
    it('should return a positive number when adding', function() {
      var ctrl = $controller('MainCtrl', {$scope: $scope});
      expect(ctrl.getPositiveOrNegativeAmount_(10, '+')).toEqual(10);
    });

    it('should return a negative number when subtracting', function() {
      var ctrl = $controller('MainCtrl', {$scope: $scope});
      expect(ctrl.getPositiveOrNegativeAmount_(10, '-')).toEqual(-10);
    });
  });


  describe('calculateTotal', function() {
  });


  describe('removeItem', function() {
  });


  describe('addItem', function() {
  });

});
