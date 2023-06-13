const Book = require('../models/Book');

// GET
exports.getAll = (req, res, next) => {
    Book.find()
        .then(books => res.status(200).json(books))
        .catch(error => res.status(400).json({error}));
};

exports.getOne = (req, res, next) => {
    Book.findOne({_id:req.params.id})
        .then(book => res.status(200).json(book))
        .catch(error => res.status(400).json({error}));
};

// POST
exports.create = (req, res, next) => {
    const object = JSON.parse(req.body.book);
    delete object._id;
    delete object._userId;
    const bookObject = new Book({
        ...object,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });

    bookObject.save()
        .then(() => res.status(201).json({message: 'Book post'}))
        .catch(error => res.status(400).json({error}));
};

// PUT
exports.modifyOne = (req, res, next) => {
    Book.updateOne({_id:req.params.id}, {...req.body, _id:req.params.id})
        .then(book => res.status(200).json({message: 'Objet modifié'}))
        .catch(error => res.status(400).json({error}));
};

// DELETE
exports.deleteOne = (req, res, next) => {
    Book.deleteOne({_id:req.params.id})
        .then(book => res.status(200).json({message: 'Objet suppprimé'}))
        .catch(error => res.status(400).json({error}));
};