/**
 * @ngdoc function
 * @name foodCircle.controller:ImageuploadCtrl
 * @description
 * # ImageuploadCtrl
 * Controller of the foodCircle
 */

(function () {
    'use strict';

    angular.module('foodCircle').controller('ImageuploadCtrl', ['recipeToEdit', 'Upload', 'API_URL', function (recipeToEdit, Upload, API_URL) {
        var vm = this, i, d, getSlides;

        vm.recipe = recipeToEdit;
        vm.recipe.images = [];

        vm.uploadImage = function (image) {
            image.upload = Upload.upload({
                url: API_URL + 'image/upload',
                fields: {
                    recipename: vm.recipe.name
                },
                file: image
            });

            image.upload.then(function (response) {
                debugger;
            }, function (response) {
                debugger;
                if (response.status > 0) {
                    vm.errorMsg = response.status + ': ' + response.data;
                }
            });

            image.upload.progress(function (evt) {
                // Math.min is to fix IE which reports 200% sometimes
                image.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total, 10));
            });
        };

        /* image drop zone*/
        vm.dropUpload = function (files) {

            if (files && files.length) {
                /*jslint plusplus: true */
                for (d = 0; i < files.length; i++) {
                    var file = files[i];
                    if (!file.$error) {
                        vm.uploadImage(file);
                    }
                }
            }
        };

        vm.imagesCollapsed = false;



        //dummy
        getSlides = function () {
            var newWidth = 300 + vm.recipe.images.length + 1;
            vm.recipe.images.push({
                image: '//placekitten.com/' + newWidth + '/' + newWidth
            });
        };
        /*jslint plusplus: true */
        for (i = 0; i < 6; i++) {
            getSlides();
        }
    }]);
}());
