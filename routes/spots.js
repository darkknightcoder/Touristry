const express=require('express');
const router=express.Router();
const spots=require('../controllers/spots');
const catchAsync=require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateSpot }=require('../Middleware');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage: storage });

const Spot=require('../models/spots');


router.route('/')
    .get(catchAsync(spots.index))
    .post(isLoggedIn,upload.array('images'), catchAsync(spots.createSpot))

router.get('/new', isLoggedIn, spots.renderNewForm)

router.route('/:id')
    .get(catchAsync(spots.showSpot))
    .put(isLoggedIn, isAuthor,upload.array('images'),catchAsync(spots.updateSpot))
    .delete(isLoggedIn, isAuthor, catchAsync(spots.deleteSpot))

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(spots.renderEditForm))

module.exports=router;