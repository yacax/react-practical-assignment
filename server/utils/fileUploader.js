const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/');
    },
    filename: (req, file, cb) => {
        if (!req.params.id) throw new Error('Post ID param does not defined');
        let extArray = file.mimetype.split("/");
        let extension = extArray[extArray.length - 1];
        cb(null, `${req.params.id}.${extension}`);
    }
});
    
exports.upload = multer({ storage: storage });
