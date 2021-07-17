const sequenceGenerator = require('./sequenceGenerator');
const Videos = require('../models/video');

var express = require('express');
var router = express.Router();
module.exports = router;

router.get('/', (req, res, next) => {
    Videos.find()
        .then(videos => {
            res.status(200).json({
                message: 'Videos fetched successfully!',
                videos: videos
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
    const maxItemtId = sequenceGenerator.nextId("videos");

    const Videos = new Videos({
        id: maxItemtId,
        name: req.body.name,
        videoUrl: req.body.videoUrl,        
    });

    Videos.save()
        .then(createdItem => {
            res.status(201).json({
                message: 'Videos added successfully',
                Videos: createdItem
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
    Videos.findOne({ id: req.params.id })
        .then(Videos => {
            Videos.name = req.body.name;
            Videos.videoUrl = req.body.videoUrl;

            Videos.updateOne({ id: req.params.id }, Videos)
                .then(result => {
                    res.status(204).json({
                        message: 'Videos updated successfully'
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
                message: 'Videos not found.',
                error: { Videos: 'Videos not found' }
            });
        });
});

router.delete("/:id", (req, res, next) => {
    Videos.findOne({ id: req.params.id })
        .then(Videos => {
            Videos.deleteOne({ id: req.params.id })
                .then(result => {
                    res.status(204).json({
                        message: "Videos deleted successfully"
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
                message: 'Videos not found.',
                error: { Videos: 'Videos not found' }
            });
        });
});