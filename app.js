const express = require('express')
const app = express()
const ejsMate = require('ejs-mate')
const mongoose = require('mongoose')
const dotenv = require("dotenv");

dotenv.config();

// mongoose
//     .connect(process.env.MONGO_URL)
//     .then(() => console.log("DB Connection Successful"))
//     .catch((err) => {
//         console.log(err);
//     });

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views')
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('homepage')
})

app.get('/Hotspots',(req,res)=>{
    res.render("Hotspots/landingpage")
})

app.get('/Hotspots/new', (req,res)=>{
    res.render('Hotspots/newSpot')
})

app.listen(3000, () => {
    console.log("Serving on port 3k")
})