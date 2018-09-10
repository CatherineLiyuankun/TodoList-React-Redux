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

mongoose.Promise = Promise;

// https://mlab.com/
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

app.get('/todoitems/:status', (req, res) => {
    const status = req.params.status === 'active' ? false : true;
    Todoitem.find({marked: status}, (err, todoitems) => {
        res.send(todoitems);
    });
});

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

//---------------------------------async await --------------------------------------
app.post('/todoitems', async (req, res) => {
    try {
        const todoitem = new Todoitem(req.body);

        const savedTodoItem = await todoitem.save();
        console.log('saved', savedTodoItem);
        
        if (savedTodoItem) {    
            res.sendStatus(200);
            io.emit('todoitem', savedTodoItem);
        }
    } catch (error) {
        res.sendStatus(500);
        return console.error(error);
    } finally {
        console.log('post called');
    }
});

//---------------------------------promise----------------------------------------------
/* app.post('/todoitems', (req, res) => {
    const todoitem = new Todoitem(req.body);

    todoitem.save()
    .then(() => { //filter the new added todoitem
        console.log('saved');
        // return Todoitem.findOne({text: 'badword'}); //filter the badword

        return Todoitem.findOne(req.body);
    })
    .then((todoitem) => {
        if (todoitem) {
            console.log('censored todoitem found', todoitem);
            // return Todoitem.remove({_id: todoitem._id}); //remove the badword

            res.sendStatus(200);
            io.emit('todoitem', todoitem);
        }
    })
    .catch((err) => {
        res.sendStatus(500);
        return console.error(err);
    });
}); */

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
