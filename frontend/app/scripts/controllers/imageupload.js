/**
 * @ngdoc function
 * @name foodCircle.controller:ImageuploadCtrl
 * @description
 * # ImageuploadCtrl
 * Controller of the foodCircle
 */

(function () {
    'use strict';

    angular.module('foodCircle').controller('ImageuploadCtrl', ['recipeToEdit', 'Upload', 'API_URL', '$timeout', 'alert', function (recipeToEdit, Upload, API_URL, $timeout, alert) {
        var vm = this, i, d, getSlides;

        vm.recipe = recipeToEdit;
        vm.recipe.images = [];
        vm.imagesToUpload = [];

        vm.createProgressbar = function (images) {
        //multiple images html5 create progressbars
            if (images) {
                vm.imagesToUpload = images;
            }
            if (angular.isArray(vm.imagesToUpload)) {
                //TODO set error in image progressbar
                //show why error e.g. image too big
                angular.forEach(vm.imagesToUpload, function (image) {
                    if (image.$error) {

                    }
                });

            }
        };
        vm.uploadImage = function (images) {
            if (!images) {
                images = vm.imagesToUpload;
            }
            vm.upload = Upload.upload({
                url: API_URL + 'image/upload',
                data: {
                    recipename: vm.recipe.name,
                    file: images
                },
                arrayKey: ''
            });

            vm.upload.then(function (response) {
                //upload finished reset everything
                alert('success', 'Upload finished');
                $timeout(function () {
                    vm.uploadImage.progress = 0;
                    vm.imagesToUpload = [];
                }, 1500);


            }, function (response) {
                if (response.status > 0) {
                    vm.errorMsg = response.status + ': ' + response.data;
                }
            });

            vm.upload.progress(function (evt) {
                // Math.min is to fix IE which reports 200% sometimes
                vm.uploadImage.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total, 10));
            });
        };

        /* image drop zone*/
        vm.onFileDroped = function () {
            if (vm.dropFiles && vm.dropFiles !== null) {
                if (angular.isArray(vm.dropFiles)) {
                    vm.createProgressbar(vm.dropFiles);
                } else {
                    vm.createProgressbar([vm.dropFiles]);
                }
                vm.uploadImage();
            }
        };

        vm.imagesCollapsed = false;


        //TODO remove getSlides, images will be provided by server
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
