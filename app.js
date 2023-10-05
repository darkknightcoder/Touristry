const express = require('express');
const app=express();
const path=require('path');
const ejsMate = require('ejs-mate');
const session=require('express-session');
const flash=require("connect-flash");
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const Spot = require('./models/spots');
const User = require('./models/user');
const Review = require('./models/reviews');
const ExpressError=require('./utils/ExpressError');
const MongoDBStore=require('connect-mongo');
const methodOverride = require('method-override');
const passport = require('passport');
const passLocal=require("passport-local")

const userRoutes=require('./routes/users');
const spotRoutes=require('./routes/spots');
const reviewRoutes=require('./routes/reviews');

dotenv.config();
const Mongourl=process.env.MONGO_URL;

mongoose.connect(Mongourl,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error',console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});


app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json());

const secret=process.env.SECRET || 'ashisjustagaynigga';

 const store=MongoDBStore.create({
    mongoUrl: Mongourl,
    secret,
    touchAfter: 24 * 60 *60,
});

store.on("error", function(e){
    console.log("Session Store Error" ,e)
})

const sessionConfig = {
    name: 'session',
    secret,
    resave: false,
    saveUninitialized : true,
    store,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000*60*60*24*7,
        maxAge: 1000*60*60*24*7
    }
}

app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new passLocal(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.currentUser=req.user;
    res.locals.success=req.flash('success');
    res.locals.error=req.flash('error');
    next();
})

app.use('/', userRoutes);
app.use('/Hotspots/viewspot', spotRoutes);
app.use('/Hotspots/viewspot/:id/reviews', reviewRoutes);

app.get('/', (req, res) => {
    res.render('homepage');
})


app.all('*',(req,res,next)=>{
    next(new ExpressError('Page not Found', 404 ))
})

app.use((err,req,res,next)=>{
    const { statusCode=500 }=err;
    if(!err.message) err.message= 'Oh No, Something Went Wrong!'
    res.status(statusCode).render('error', {err})
})


app.listen(3000, () => {
    console.log("Serving on port 3k");
})