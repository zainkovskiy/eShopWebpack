const express = require('express');
const fs = require('fs');
const handler = require('./handler');
const router = express.Router();
const path = require('path');

const cartJSON = path.resolve(__dirname, './db/userCart.json');

router.get('/', (req, res) => {
    fs.readFile(cartJSON, 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({result: 0, text: err}));
        } else {
            res.send(data);
        }
    });
});

router.post('/', (req, res) => {
    handler(req, res, 'add', cartJSON);
});

router.put('/:id', (req, res) => {
    handler(req, res, 'change', cartJSON);
});

router.delete('/:id', (req, res) => {
    handler(req, res, 'remove', cartJSON);
});

module.exports = router;