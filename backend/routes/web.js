const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');

const bookController = require('../controllers/bookController');
const userController = require('../controllers/userController');

router.get('/books',bookController.getAll);
// router.get('/books/bestrating',bookController.getThree);
router.get('/books/:id',bookController.getOne);
router.post('/books', auth, multer,bookController.create);
router.put('/books/:id', auth, multer,bookController.modifyOne);
router.delete('/books/:id', auth,bookController.deleteOne);
// router.post('/books/:id/rating', auth, multer,bookController.create);

router.post('/auth/signup', userController.signup);
router.post('/auth/login', userController.login);

module.exports = router;