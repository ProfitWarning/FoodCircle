/**
 * @ngdoc function
 * @name foodCircle.controller:ImageuploadCtrl
 * @description
 * # ImageuploadCtrl
 * Controller of the foodCircle
 */
/*global
    angular
*/

(function () {
    'use strict';

    angular.module('foodCircle').controller('ImageuploadCtrl', ['recipeToEdit', 'Upload', 'API_URL', '$timeout', 'alert', '$filter', 'recipeService', '$confirm', '$exceptionHandler', function (recipeToEdit, Upload, API_URL, $timeout, alert, $filter, recipeService, $confirm, $exceptionHandler) {

        var vm = this,
            removeImage = function (image) {
                var found = $filter('filter')(vm.recipe.images, {id: image.id}, false),
                    pos;
                if (found && found.length > 0) {
                    pos = vm.recipe.images.map(function (e) {return e.id; }).indexOf(found[0].id);
                    vm.recipe.images.splice(pos, 1);
                }
            },

            calculateAspectRatioFit = function (srcWidth, srcHeight, maxWidth, maxHeight) {
                var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);

                return { width: srcWidth * ratio, height: srcHeight * ratio };
            };
        //function({ maxWidth: someWidth, srcWidth: someOtherWith, maxHeight: someHeight, srcHeight: someOtherHeight });;

        vm.recipe = recipeToEdit;
        vm.imagesToUpload = [];
        vm.invalidFilesArray = [];
        vm.uploadMaxSize = '4.6MB';
        vm.API_URL = API_URL;
        vm.resizeHeight = 720;
        vm.resizeWidth = 960;


        vm.createProgressbar = function (images) {
            //multiple images html5 create progressbars
            if (images) {
                vm.imagesToUpload = images;
            }

            if (angular.isArray(vm.imagesToUpload)) {
                //show why error e.g. image too big
                angular.forEach(vm.imagesToUpload, function (image) {
                    if (image.$error) {
                        image.errorObj = {};
                        image.errorObj[image.$error] = true;
                        return;
                    }

                    if (image.errorObj) {
                        delete image.errorObj;
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
                    recipeId: vm.recipe.id,
                    file: images
                },
                arrayKey: ''
            });

            vm.upload.then(function (res) {
                vm.recipe.images = res.data.file;
                //upload finished reset everything
                alert('success', 'Success', 'Upload finished', 2000);
                $timeout(function () {
                    vm.uploadImage.progress = 0;
                    vm.imagesToUpload = [];
                }, 1500);

            }, function (response) {
                if (response.status > 0) {
                    vm.errorMsg = response.status + ': ' + response.data;
                }
                $exceptionHandler(response);
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

        vm.onSelectImage = function (image, event) {
            event.preventDefault();

            if (image.selected) {
                image.selected = false;
                return;
            }
            //unselect all other
            $filter('filter')(vm.recipe.images, {selected: true}, false).forEach(function (img) {
                img.selected = false;
            });
            //select image
            image.selected = !image.selected;
        };

        vm.onDeleteImage = function (image, event) {
            event.preventDefault();

            $confirm({
                text: 'Delete image?'
            })
                .then(function () {
                    recipeService.removeImage(vm.recipe, image).then(function (deltedImage) {
                        recipeService.removeArrayItem(vm.recipe.images, {id: deltedImage.id});
                    });
                });
        };

    }]);
}());
