'use strict';

ns('ec.footer');

ec.footer.DIRECTIVE_NAME = 'ecFooter';

/**
 * @return {angular.Directive} Directive definition object.
 */
ec.footer.footerDirective = function() {
  return {
    scope: {},
    templateUrl: 'js/components/footer/footer.html'
  };
};

/**
 * Defines the 'footer' module, which exports the footer directive.
 * @type {!angular.Module}
 */
ec.footer.module = angular.module('ecalc.footer', []).
    directive(ec.footer.DIRECTIVE_NAME, ec.footer.footerDirective);
