/**
 * ImageController
 *
 * @description :: Server-side logic for managing files
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    upload: function (req, res) {
        if (req.method === 'GET') {
            return res.json({
                status: '401',
                message: 'GET not allowed.'
            });
        }

        //TODO move path to config
        var uploadFile = req.file('file'),
            imagePath = '../../.uploads/images/' + req.body.recipename;


        uploadFile.on('progress', function (event) {
            return event;
        }).upload({
            dirname: imagePath
        }, function onUploadComplete(err, files) {
            //    IF ERROR Return and send 500 error with error
            if (err) {
                return res.serverError(err);
            }

            //TODO store base64 image on recipe model
            //find by name + add image

            res.json({
                status: 200,
                file: files
            });
        });
    },
    create: function (req, res) {
        return res.json({
            status: '401',
            message: 'Simple POST not allowed.'
        });
    }

    //TODO create GET for retrieving uploaded images
    //no authorization reqired
};
