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
    console.log(req.body);
    delete req.body._id;
    const book = new Book({
        ...req.body // ... permet de recup toutes les infos de req
    });
    book.save()
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