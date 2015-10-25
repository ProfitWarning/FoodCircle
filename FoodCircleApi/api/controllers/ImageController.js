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
    path = require('path'),
    slugger = require('slugger');

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
                                filename: slugger(recipeName + '_' + img.filename, {alsoAllow: "."}),
                                size: img.size,
                                type: img.type,
                                fd: img.fd,
                                base64: file.toString('base64'),
                                forrecipe: recipeId,
                                skipperFilename: img.fd.substring(img.fd.lastIndexOf('/') + 1),
                                url: 'image/' + img.fd.substring(img.fd.lastIndexOf('/') + 1),
                                baseUrl: req.baseUrl,
                                absoluteUrl: req.baseUrl + '/image/' + img.fd.substring(img.fd.lastIndexOf('/') + 1)
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
                            return res.json('400', {
                                error: err.details
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
    },

    findOne: function (req, res) {
        'use strict';

        Image.findOne({skipperFilename: req.params.id}).exec(function (err, image) {
            if (err) {
                return res.json('404', {
                    err: 'Image not found.'
                });
            }

            if (!err && !image) {
                return res.json('500', {
                    err: 'Image look up failed.'
                });
            }

            return res.sendfile(image.fd);
        });

    }
};
