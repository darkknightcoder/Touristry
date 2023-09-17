const express = require('express');
const app = express();
const ejsMate = require('ejs-mate');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const Spot=require('./models/spots');
const methodOverride=require('method-override');

dotenv.config();

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("DB Connection Successful"))
    .catch((err) => {
        console.log(err);
    });

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    res.render('homepage');
})


app.get('/Hotspots/new', (req,res)=>{
    res.render('Hotspots/newSpot');
})

app.post('/Hotspots',async (req,res)=>{
    const spot=new Spot(req.body.spot);
    await spot.save();
    console.log(spot);
    res.redirect('/Hotspots');
})

app.get('/Hotspots/viewspot', async (req,res)=>{
    const spots=await Spot.find({});
    res.render('Hotspots/landingpage', {spots});
})

app.get('/Hotspots/viewspot/:id', async (req,res)=>{
    const spot=await Spot.findById(req.params.id);
    res.render('Hotspots/viewSpot', {spot});
})

app.get('/Hotspots/viewspot/:id/edit', async(req,res)=>{
    const spot=await Spot.findById(req.params.id);
    res.render('Hotspots/editpage', {spot});
})

app.put('/Hotspots/viewspot/:id', async (req,res)=>{
    const { id }=req.params;
    const spot=await Spot.findByIdAndUpdate(id, {...req.body.spot});
    res.redirect(`Hotspots/viewspot/${spot._id}`);
})

app.delete('/Hotspots/viewspot/:id', async (req,res)=>{
    const { id }=req.params;
    await Spot.findByIdAndDelete(id);
    res.redirect('/Hotspots/viewspot');
})

app.listen(3000, () => {
    console.log("Serving on port 3k");
})