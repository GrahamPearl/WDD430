const sequenceGenerator = require('./sequenceGenerator');
const Notice = require('../models/Notice');

var express = require('express');
var router = express.Router();
module.exports = router;

router.get('/', (req, res, next) => {
    Notice.find()
        .then(notices => {
            res.status(200).json({
                message: 'Notices fetched successfully!',
                notices: notices
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'An error occured',
                error: error
            });
        });
});

router.post('/', (req, res, next) => {
    const maxItemtId = sequenceGenerator.nextId("notices");

    const Notice = new Notice({
        id: maxItemtId,
        name: req.body.name,
        description: req.body.description,
        url: req.body.url
    });

    Notice.save()
        .then(createdDocument => {
            res.status(201).json({
                message: 'Notice added successfully',
                Notice: createdDocument
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
    Notice.findOne({ id: req.params.id })
        .then(Notice => {
            Notice.name = req.body.name;
            Notice.description = req.body.description;
            Notice.url = req.body.url;

            Notice.updateOne({ id: req.params.id }, Notice)
                .then(result => {
                    res.status(204).json({
                        message: 'Notice updated successfully'
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
                message: 'Notice not found.',
                error: { Notice: 'Notice not found' }
            });
        });
});

router.delete("/:id", (req, res, next) => {
    Notice.findOne({ id: req.params.id })
        .then(Notice => {
            Notice.deleteOne({ id: req.params.id })
                .then(result => {
                    res.status(204).json({
                        message: "Notice deleted successfully"
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
                message: 'Notice not found.',
                error: { Notice: 'Notice not found' }
            });
        });
});