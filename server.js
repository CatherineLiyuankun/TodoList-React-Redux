const webpack = require('webpack');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const config = require('./webpack.config.dev');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const _ = require('lodash');
const compiler = webpack(config);
const app = express();

const webpackDevOptions = {
    noInfo: true,
    historyApiFallback: true,
    publicPath: config.output.publicPath,
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
};

app.use(webpackDevMiddleware(compiler, webpackDevOptions));
app.use(webpackHotMiddleware(compiler));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const todoitems = [
    {id:_.uniqueId('server_'), marked:false, text:'todo1'},
    {id:_.uniqueId('server_'), marked:false, text:'todo2'},
    {id:_.uniqueId('server_'), marked:false, text:'todo3'}
]

app.get('/todoitems', (req, res) => {
    res.send(todoitems);
});

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/todoitems', (req, res) => {
    todoitems.push(req.body);
    res.sendStatus(200);
});

app.listen(8787, '0.0.0.0', function(err) {
    if (err) {
        console.log(err);
        return;
    }

    console.log('Listening at http://localhost:8787');
});