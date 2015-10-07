/**
 * ImageController
 *
 * @description :: Server-side logic for managing files
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
/*global
    require, Recipe, module, sails
*/

var SkipperDisk = require('skipper-disk'),
    path = require('path');

module.exports = {
    upload: function (req, res) {
        "use strict";

        if (req.method === 'GET') {
            return res.json({
                status: '401',
                message: 'GET not allowed.'
            });
        }

        var uploadFile = req.file('file'),
            recipeName = req.body.recipename,
            imagePath = '../../' + path.join(sails.config.circle.imageupload.storagepath, req.body.recipename),
            recipeId = req.body.recipeId,
            newImages = [],

            createNewArray = function (files, cb) {
                var fileAdapter = SkipperDisk();/* optional opts */

                files.forEach(function (img) {
                    fileAdapter.read(img.fd, function (err, file) {
                        if (err) {
                            res.json(err);

                        } else {
                            newImages.push({
                                filename: img.filename,
                                size: img.size,
                                type: img.type,
                                fd: img.fd,
                                base64: file.toString('base64'),
                                forrecipe: recipeId
                            });
                        }
                        if (newImages.length === files.length) {
                            cb(newImages);
                        }
                    });
                });


            };


        uploadFile.on('progress', function (event) {
            return event;

        }).upload({dirname: imagePath}, function onUploadComplete(err, files) {
            //    IF ERROR Return and send 500 error with error
            if (err) {
                return res.serverError(err);
            }

            createNewArray(files, function (newImages) {

                Recipe.findOne({name: recipeName}).populate('images').exec(function (err, recipe) {

                    if (!recipe.images) {
                        recipe.images = newImages;
                    } else {
                        newImages.forEach(function (imgItem) {
                            recipe.images.add(imgItem);
                        });
                    }
                    recipe.save(function (err, updatedRecipe) {
                        if (err) {
                            return res.json('401', {
                                err: err.details
                            });
                        }

                        res.json({
                            status: 200,
                            file: newImages
                        });

                    });
                });



            });

        });
    },
    create: function (req, res) {
        "use strict";

        return res.json({
            status: '401',
            message: 'Simple POST not allowed.'
        });
    }

    //TODO create GET for retrieving uploaded images
    //no authorization reqired
};
