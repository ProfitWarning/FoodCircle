/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function (cb) {

    // It's very important to trigger this callback method when you are finished
    // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
    sails.log('Bootstrap called.');

    var fs = require('fs'),
        unUsedPaths = [],
        usedPaths = [],
        allPaths = [],
        walk = require('fs-walk'),
        path = require('path');


    Recipe.find().populate('images').exec(function (err, recipes) {
        if (err) {
            sails.log.error('Error finding recipes\' images.');
            cb();
        }
        sails.log('Found ' + recipes.length + ' recipes.');

        recipes.forEach(function (recipe) {
            sails.log('Checking recipe: ' + recipe.name);
            sails.log('Found ' + recipe.images.length + ' images.');

            recipe.images.forEach(function (img) {
                usedPaths.push(img.fd);
            });
        });
        sails.log('Found ' + usedPaths.length + ' used images in database:');
        usedPaths.forEach(function (itemPath, idx) {
            sails.log('  Image: ' + itemPath);
        });

        sails.log('Checking image directory');
        sails.log('Directory: ' + process.cwd() + '/.uploads/images/recipeimages');

        fs.stat(process.cwd() + '/.uploads/images/recipeimages', function (err, stats) {
            if (err) {
                sails.log.error(err);

                return cb();
            }

            walk.dirsSync(process.cwd() + '/.uploads/images/recipeimages', function (basedir, filename, stat) {

                walk.filesSync(path.join(basedir, filename), function (subbasedir, subfilename, substat) {
                    allPaths.push(path.join(subbasedir, subfilename));
                });
            });
            sails.log('Found ' + allPaths.length + ' images:');
            allPaths.forEach(function (itemPath, idx) {
                sails.log('  Image: ' + itemPath);
            });


            // in database but not on disk
            sails.log('Checking images in database but not on disk');
            var notOnDisk = [];
            usedPaths.forEach(function (itemPath, idx) {
                if (allPaths.indexOf(itemPath) === -1) {
                    notOnDisk.push(itemPath);
                }
            });
            sails.log.error('Found ' + notOnDisk.length + ' images in database but not on disk:');
            notOnDisk.forEach(function (itemPath, idx) {
                sails.log.error('  Image: ' + itemPath);
            });


            // on disk but not in database
            sails.log.error('Checking images on disk but not in database');
            allPaths.forEach(function (itemPath, idx) {
                if (usedPaths.indexOf(itemPath) === -1) {
                    unUsedPaths.push(itemPath);
                }
            });
            sails.log.error('Found ' + unUsedPaths.length + ' unused images on disk but not in database:');
            unUsedPaths.forEach(function (itemPath, idx) {
                sails.log.error('  Image: ' + itemPath);
            });

            cb();
        });
    });
};
