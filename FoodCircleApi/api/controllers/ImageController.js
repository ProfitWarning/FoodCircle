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
                                url: 'image/serve/' + img.fd.substring(img.fd.lastIndexOf('/') + 1)
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

        }).upload({dirname: imagePath, maxBytes: 5000000}, function onUploadComplete(err, files) {
            //    IF ERROR Return and send 500 error with error
            if (err) {
                return res.negotiate(err);
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
                            return res.negotiate(err);
                        }

                        res.json({
                            status: 200,
                            file: updatedRecipe.images
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

    serve: function (req, res) {
        'use strict';

        Image.findOne({skipperFilename: req.params.id}).exec(function (err, image) {
            if (err) {
                return res.negotiate(err);
            }

            if (!err && !image) {
                return res.json('500', {
                    err: 'Image look up failed.'
                });
            }

            if (!image) {
                return res.notFound();
            }

            return res.sendfile(image.fd);
        });

    }
};
