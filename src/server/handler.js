const fs = require('fs');
const cart = require('./cart');
const dateFormat = require('dateformat');
const path = require('path');

const statsJSON = path.resolve(__dirname, './db/stats.json');

const actions = {
    add: cart.add,
    change: cart.change,
    remove: cart.remove,
};

const handler = (req, res, action, file) => {
    fs.readFile(file, 'utf-8', (err, data) => {
        if (err){
            res.sendStatus(404, JSON.stringify({result: 0, text: err}));
        } else {
            const newCart = actions[action](JSON.parse(data), req);
            fs.writeFile(file, newCart, (err) => {
                if (err){
                    res.send('{"result": 0}');
                } else {
                    res.send('{"result": 1}');
                }
            })
        }
    });
    fs.readFile(statsJSON, 'utf-8', (err, data) => {
        if (err){
            console.log(err);
        } else {
            const time = new Date();
            const stat = JSON.parse(data);
            const newStat = { product: `${req.body.product_name}`, status: `${action}`, data: `${dateFormat(time)}`};
            stat.push(newStat);
            fs.writeFile(statsJSON, JSON.stringify(stat, null, 4), (err) => {
                if (err){
                    console.log(err);
                }
            });
        }
    });
};
module.exports = handler;

