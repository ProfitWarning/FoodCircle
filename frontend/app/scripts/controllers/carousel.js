/**
 * @ngdoc function
 * @name foodCircle.controller:CarouselCtrl
 * @description
 * # CarouselCtrl
 * Controller of the foodCircle
 */
/*global
    angular
*/

(function () {
    'use strict';

    angular.module('foodCircle').controller('CarouselCtrl', function () {
        var vm = this, i,

            getSlides = function () {
                var newWidth = 600 + vm.carousel.slides.length + 1;
                vm.carousel.slides.push({
                    image: '//placekitten.com/' + newWidth + '/300',
                    text: ['More', 'Extra', 'Lots of', 'Surplus'][vm.carousel.slides.length % 4] + ' ' + ['Cats', 'Kittys', 'Felines', 'Cutes'][vm.carousel.slides.length % 4]
                });
            };

        vm.carousel = {
            interval: 5000,
            noWrapSlides: false,
            slides: []
        };
        /*jslint plusplus: true */
        for (i = 0; i < 4; i++) {
            getSlides();
        }
    });
}());
