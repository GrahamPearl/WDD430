const sequenceGenerator = require('./sequenceGenerator');
const Document = require('../models/document');

var express = require('express');
var router = express.Router();
module.exports = router;

router.get('/', (req, res, next) => {
    //call the Document model find() method to get all ... in the collection
    Document.find()
        .then(document => {
            res.status(200).json({
                message: 'Documents fetched successfully!',
                documents: documents
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'An error occurred - unable to fetch documents from MongoDB',
                error: error
            });
        });
});

router.post('/', (req, res, next) => {
    const maxDocumentId = sequenceGenerator.nextId("documents");

    const document = new Document({
        id: maxDocumentId,
        name: req.body.name,
        description: req.body.description,
        url: req.body.url
    });

    document.save()
        .then(createdDocument => {
            res.status(201).json({
                message: 'Document added successfully',
                document: createdDocument
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'An error occurred',
                error: error
            });
        });
});

router.put('/:id', (req, res, next) => {
    Document.findOne({ id: req.params.id })
        .then(document => {
            document.name = req.body.name;
            document.description = req.body.description;
            document.url = req.body.url;

            Document.updateOne({ id: req.params.id }, document)
                .then(result => {
                    res.status(204).json({
                        message: 'Document updated successfully'
                    })
                })
                .catch(error => {
                    res.status(500).json({
                        message: 'An error occurred',
                        error: error
                    });
                });
        })
        .catch(error => {
            res.status(500).json({
                message: 'Document not found.',
                error: { document: 'Document not found' }
            });
        });
});

router.delete("/:id", (req, res, next) => {
    Document.findOne({ id: req.params.id })
        .then(document => {
            Document.deleteOne({ id: req.params.id })
                .then(result => {
                    res.status(204).json({
                        message: "Document deleted successfully"
                    });
                })
                .catch(error => {
                    res.status(500).json({
                        message: 'An error occurred',
                        error: error
                    });
                })
        })
        .catch(error => {
            res.status(500).json({
                message: 'Document not found.',
                error: { document: 'Document not found' }
            });
        });
});