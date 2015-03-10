'use strict';

ns('ec.footer');


/**
 * Name that the directive will be registered with.
 * @export
 * @type {string}
 */
ec.footer.FOOTER_DIRECTIVE_NAME = 'ecFooter';


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
ec.footer.module = angular.module('ec.footer', []).
    directive(ec.footer.FOOTER_DIRECTIVE_NAME, ec.footer.footerDirective);
