const multer = require('multer');

//Lưu ảnh theo đúng định dạng
const multerStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'uploads');
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + '_' + file.originalname);
    }
});

const upload = multer({dest: 'uploads', fileFilter: (req, file, callback) => {
    //Chỉ chấp nhận file thuộc loại image
    if(file.mimetype.startsWith('image/')){
        callback(null, true);//Cho phép upload
    }
    else{
        callback(null, false);//Không cho phép upload
    }
}, storage: multerStorage, limits: {fileSize: 5000000} });//Giới hạn file là 50MB


module.exports = upload;