const Book = require('../models/Book');
const fs = require('fs');

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

exports.getThree = (req, res, next) => {
    Book.find({_id:req.params.id})
        .then(
            books => res.status(200).json(books)
        )
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
    const bookObject = req.file ? {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  
    delete bookObject._userId;
    Book.findOne({_id: req.params.id})
        .then((book) => {
            if (book.userId != req.auth.userId) { // N'est pas son livre
                res.status(401).json({ message : 'Not authorized'});
            } else {                              // Met a jour son livre
                Book.updateOne({ _id: req.params.id}, { ...bookObject, _id: req.params.id})
                .then(() => res.status(200).json({message : 'Objet modifié!'}))
                .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

// DELETE
exports.deleteOne = (req, res, next) => {
    Book.findOne({ _id: req.params.id})
    .then(book => {
        if (book.userId != req.auth.userId) {
            res.status(401).json({message: 'Not authorized'});
        } else {
            const filename = book.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Book.deleteOne({_id: req.params.id})
                    .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
                    .catch(error => res.status(401).json({ error }));
            });
        }
    })
    .catch( error => {
        res.status(500).json({ error });
    });
};