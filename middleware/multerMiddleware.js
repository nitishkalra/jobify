import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, 'public/uploads');
    },
    filename: function(req, file, cb) {
        const fileName = file.originalname;
        cb(null, fileName);
    }
});

const upload = multer({storage});

export default upload;