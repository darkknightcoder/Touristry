const express=require('express');
const router=express.Router({ mergeParams: true });
const { validateReview, isLoggedIn, isReviewAuthor }=require('../Middleware');
const Spot=require('../models/spots');
const Review=require('../models/reviews');
const reviews=require('../controllers/reviews');
const ExpressError=require('../utils/ExpressError');
const catchAsync=require('../utils/catchAsync');

router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports=router;
