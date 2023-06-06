const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

const bookController = require('../controllers/bookController');
const userController = require('../controllers/userController');

router.get('/books/', auth,bookController.getAll);
router.get('/books/:id', auth,bookController.getOne);
router.post('/books/', auth,bookController.create);
router.put('/books/:id', auth,bookController.modifyOne);
router.delete('/books/:id', auth,bookController.deleteOne);

router.post('/auth/signup', userController.signup);
router.post('/auth/login', userController.login);

module.exports = router;