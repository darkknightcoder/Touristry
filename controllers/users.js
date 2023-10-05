const User=require('../models/user');

module.exports.renderRegister = (req,res)=>{
    res.render('User/register');
}

module.exports.register =  async(req,res,next)=>{
    try{
        const { email,username,password }=req.body;
        const user=new User({email,username});
        const registeredUser= await User.register(user,password);
        req.login(registeredUser, err =>{
            if(err) return next(err);
            req.flash('success','Welcome to Touristry');
            res.redirect('/Hotspots/viewspot');
        })
    }
    catch(e){
        req.flash('error',e.message);
        res.redirect('/register');
    }
}

module.exports.renderLogin = (req,res)=>{
    res.render('User/login');
}

module.exports.login = async(req,res)=>{
    req.flash('success','Welcome back!');
    const redirectUrl=req.session.returnTo || '/Hotspots/viewspot';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}

module.exports.logout = (req,res,next)=>{
    req.logout( e=> {
        if(e) return next(e);
        req.flash('success','You have been logged out.');
        res.redirect('/Hotspots/viewspot');
    });
}