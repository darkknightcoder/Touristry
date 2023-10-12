const ExpressError=require('./utils/ExpressError');
const Spot=require('./models/spots');
const Review=require('./models/reviews');
const { spotSchema, reviewSchema } = require('./Schemas.js');


module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()) {
        req.session.returnTo=req.orginalUrl
        req.flash('error','You must be Signed in First');
        return res.redirect('/login');
    }
    next();
}

module.exports.isAuthor = async (req, res, next)=>{
    const { id }=req.params;
    const spot= await Spot.findById(id);
    if(!spot.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permissions to do that!');
        return res.redirect(`/Hotspots/viewspot/${id}`)
    }
    next();
}

module.exports.validateSpot=(req,res,next)=>{
    const { error }=spotSchema.validate(req.body);
    console.log(req.body);
    if(error){
        const msg=error.details.map(e=> e.message).join(',');
        throw new ExpressError(msg, 400);
    }
    else{
        next();
    }
}

module.exports.isReviewAuthor = async (req,res,next)=>{
    const { id, reviewId}= req.params;
    const review =await Review.findById(reviewId);
    if(!review.author === req.user._id){
        req.flash('error','You do not Have permission to delete this Review');
        return res.redirect(`/Hotspots/viewspot/${id}`);
    }
    else next();
}

module.exports.validateReview= (req,res,next)=>{
    const { error }= reviewSchema.validate(req.body);
    if(error){
        const msg= error.details.map(el=>el.message).join(',');
        throw new ExpressError(msg ,400);
    }
    else next();
}