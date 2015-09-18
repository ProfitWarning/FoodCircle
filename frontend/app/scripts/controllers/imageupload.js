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
        var vm = this;
        vm.recipe = recipeToEdit;


        vm.uploadImage = function (image) {
            debugger;
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
    }]);
}());
