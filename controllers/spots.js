const Spot=require('../models/spots');

module.exports.index= async (req, res) => {
    const spots = await Spot.find({});
    res.render('Hotspots/landingpage', { spots });
}

module.exports.renderNewForm = (req, res) => {
    res.render('Hotspots/newSpot');
}

module.exports.createSpot = async (req, res, next) => {
    const spot = new Spot(req.body.spot);
    spot.author = req.user._id;
    await spot.save();
    console.log(spot);
    req.flash('success','Successfully created a new Campground');
    res.redirect(`/Hotspots/viewspot/${spot._id}`);
}

module.exports.showSpot = async (req, res) => {
    const spot = await Spot.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author');
    if(!spot){
        req.flash('error','Cannot find that Spot')
        return res.redirect('/Hotspots/viewspot');
    }
    res.render('Hotspots/viewSpot', { spot });
}

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const spot = await Spot.findById(id);
    if (!spot) {
        req.flash('error', 'Cannot find that spot!');
        return res.redirect('/Hotspots/viewspot');
    } 
    res.render('Hotspots/editpage', { spot });
}

module.exports.updateSpot =  async (req, res) => {
    const { id } = req.params;
    const spot = await Spot.findByIdAndUpdate(id, { ...req.body.spot });
    await spot.save();
    req.flash('success','Successfully updated Spot');
    res.redirect(`/Hotspots/viewspot/${spot._id}`);
}

module.exports.deleteSpot =  async (req, res) => {
    const { id } = req.params;
    await Spot.findByIdAndDelete(id);
    req.flash('success','Successfully deleted the Spot')
    res.redirect('/Hotspots/viewspot');
}
