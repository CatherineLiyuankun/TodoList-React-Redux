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
const http = require('http').Server(app);
const io = require('socket.io')(http);
const mongoose = require('mongoose');

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

const dbUrl = 'mongodb://admin123:admin123@ds147011.mlab.com:47011/learning-nodejs-lyk';

const Todoitem = mongoose.model('Todoitem', {
    id: String,
    marked: Boolean,
    text: String
})

app.get('/todoitems', (req, res) => {
    Todoitem.find({}, (err, todoitems) => {
        res.send(todoitems);
    });
});

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/todoitems', (req, res) => {
    const todoitem = new Todoitem(req.body);

    todoitem.save((err) => {
        if (err) {
            sendStatus(500);
        } else {
            io.emit('todoitem', req.body);

            Todoitem.find(req.body, (err, todoitem) => {
                res.send(todoitem);
            });
        }
    });
});

io.on('connection', (Socket) => {
    console.log('a user connected');
});

mongoose.connect(dbUrl, { useNewUrlParser: true }, (err) => {
    console.log('mongo db connected', err);
});

const server = http.listen(8787, '0.0.0.0', function(err) {
    if (err) {
        console.log(err);
        return;
    }

    console.log('Listening at http://localhost:8787');
});