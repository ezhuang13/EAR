const logger = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const express = require('express');
const cors = require('cors');
const app = express();

const setupServer = () => {
    app.use(express.static(path.join(__dirname, '../static')));

    app.use(logger('dev'));
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json({}));

    app.use(cors());

    app.get('*', (req,res) => {
        res.sendFile(path.join(__dirname, 'index.html'));
    });

    app.listen(3000, () => {
        console.log(`Server listening on port 3000 temporarily.`);
    })
}

setupServer();