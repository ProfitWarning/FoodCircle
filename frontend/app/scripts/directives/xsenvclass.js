/**
 * @ngdoc directive
 * @name foodCircle.directive:xsEnvClass
 * @description
 * # xsEnvClass
 */
/*global
    angular
*/
(function () {
    'use strict';
    angular.module('foodCircle').directive('xsEnvClass', ['jQuery', function ($) {

        var findBootstrapEnvironment = function () {
            var envs = ['xs', 'sm', 'md', 'lg'],
                $el = $('<div>'),
                i,
                env;

            $el.appendTo($('body'));

            for (i = envs.length - 1; i >= 0; i--) {
                env = envs[i];

                $el.addClass('hidden-' + env);
                if ($el.is(':hidden')) {
                    $el.remove();
                    return env;
                }
            }
        },

            addEnvClass = function (element, cssClass) {
                if (findBootstrapEnvironment() === 'xs') {
                    element.addClass(cssClass);
                } else {
                    element.removeClass(cssClass);
                }
            };

        return {
            replace: false,
            restrict: 'A',
            link: function postLink(scope, element, attrs) {
                addEnvClass(element, attrs.xsEnvClass);

                $(window).resize(function () {
                    addEnvClass(element, attrs.xsEnvClass);
                });

            }
        };
    }]);
}());
