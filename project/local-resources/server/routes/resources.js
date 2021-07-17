const sequenceGenerator = require('./sequenceGenerator');
const Resources = require('../models/resource');

var express = require('express');
var router = express.Router();
module.exports = router;

router.get('/', (req, res, next) => {
    Resources.find()
        .then(resources => {
            res.status(200).json({
                message: 'Resources fetched successfully!',
                resources: resources
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
    const maxItemtId = sequenceGenerator.nextId("resources");

    const Resources = new Resources({
        id: maxItemtId,
        title: req.body.title,
        product: req.body.product,        
        keywords: req.body.keywords,
        dateOf: req.body.dateOf, 
    });

    Resources.save()
        .then(createdItem => {
            res.status(201).json({
                message: 'Resources added successfully',
                resources: createdItem
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
    Resources.findOne({ id: req.params.id })
        .then(Resources => {
            Resources.title = req.body.title;
            Resources.product = req.body.product;
            Resources.keywords = req.body.keywords;
            Resources.dateOf = req.body.dateOf;            

            Resources.updateOne({ id: req.params.id }, Resources)
                .then(result => {
                    res.status(204).json({
                        message: 'Resources updated successfully'
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
                message: 'Resources not found.',
                error: { Resources: 'Resources not found' }
            });
        });
});

router.delete("/:id", (req, res, next) => {
    Resources.findOne({ id: req.params.id })
        .then(Resources => {
            Resources.deleteOne({ id: req.params.id })
                .then(result => {
                    res.status(204).json({
                    message: "Resources deleted successfully"
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
                message: 'Resources not found.',
                error: { Resources: 'Resources not found' }
            });
        });
});