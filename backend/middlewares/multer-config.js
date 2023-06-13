const multer = require('multer');

const MIME_TYPES = {
    'image/jpg':'jpg',
    'image/jpeg':'jpg',
    'image/png':'png',
}

const storage = multer.diskStorage({
    destination: (req, file, callback)=>{
        callback(null, 'images')
    },
    filename: (req, file, callback)=>{
        const name = file.originalname.split(' ').join('_');
        let newName = name.replace(/[^a-zA-Z0-9 ]/g, "");

        const extension = MIME_TYPES[file.mimetype];
        callback(null, newName + Date.now()+'.'+extension);
    }
});

module.exports = multer({storage}).single('image');