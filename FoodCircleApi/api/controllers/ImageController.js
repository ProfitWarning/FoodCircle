/**
 * FileController
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

        var uploadFile = req.file('file'),
            imagePath = '../../assets/images/' + req.body.recipename;


        uploadFile.on('progress', function (event) {
            return event;
        }).upload({
            dirname: imagePath
        }, function onUploadComplete(err, files) {
            // Access it via localhost:1337/images/[recipe name]file-name
            //    IF ERROR Return and send 500 error with error
            if (err) {
                return res.serverError(err);
            }

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
};
