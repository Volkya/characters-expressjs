const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const {v4: uuidv4} = require('uuid');
const {format} = require('timeago.js');
const path = require('path');

// init
const app = express();
require('./database');

// settings
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/img/uploads'),
    filename: (req, file, cb, filename) => {
        console.log(file);
        cb(null, uuidv4() + path.extname(file.originalname));
    }
})
app.use(multer({storage}).single('image'));

// global variables
app.use((req, res, next) => {
    app.locals.format = format;
    next();
})

// static files
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use(require('./routes'));

// starting

app.listen(3000, () => {
    console.log(`server on port ${app.get('port')}`);
});
