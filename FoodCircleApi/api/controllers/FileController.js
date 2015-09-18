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

        var uploadFile = req.file('recipeFile');
        console.log(uploadFile);
        var imagePath =

        uploadFile.upload({ dirname: '../../assets/images'}, function onUploadComplete(err, files) {
            // Access it via localhost:1337/images/file-name
            //    IF ERROR Return and send 500 error with error
            if (err) {return res.serverError(err); }

            console.log(files);
            res.json({
                status: 200,
                file: files
            });
        });
    }
};
