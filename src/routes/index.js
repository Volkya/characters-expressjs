const path = require('path');
const {unlink} = require('fs-extra');
const {Router} = require('express');

const router = Router();

// models
const Character = require('../models/Character');

// rutas static
router.get('/', async(req, res) => {
    res.render('index');
})


// sin necesidad de api metemos todo el unico controlador /
router.get('/upload', async(req, res) => {
    res.render('upload');
})

router.post('/upload', async (req, res) => {
    
    const image = new Character();
    image.title = req.body.title;
    image.description = req.body.description;
    image.filename = req.file.filename;
    image.path = '/img/uploads/' + req.file.filename;
    image.originalname = req.file.originalname;
    image.mimetype = req.file.mimetype;
    image.size = req.file.size;

    await image.save();
    res.redirect('/');
    
});


module.exports = router;