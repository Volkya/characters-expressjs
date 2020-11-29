const path = require('path');
const {unlink} = require('fs-extra');
const {Router} = require('express');

const router = Router();

// models
const Character = require('../models/Character');

// rutas static
router.get('/', async(req, res) => {
    const images = await Character.find();
    res.render('index', {images});
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


router.get('/character/:id', async (req, res) => {
    const {id} = req.params;
    const image = await Character.findById(id);
    res.render('detalle', {image});
})


router.get('/character/:id/delete', async (req, res) => {
    const {id} = req.params;
    const characterDeleted = await Character.findByIdAndDelete(id);
    await unlink(path.resolve('./src/public' + characterDeleted.path));
    res.redirect('/');
});

routes.post('/search', async (req, res) => {
    
})


module.exports = router;