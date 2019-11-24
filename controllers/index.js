var express = require('express');
var crypto = require('crypto');
var User = require('../models/user');
var Auth_mdw = require('../middlewares/auth');
var router = express.Router();
var secret = 'framework';
var session_store;

//index
exports.index = function(req, res, next) {
    session_store = req.session;
        res.render('index', { title: 'Express', session_store:session_store});
}

//login and registrasi user
exports.login = function(rq, res, next){
    res.render('login');
}

exports.checklogin = function(req, res, next){
    session_store = req.session;
    var password =  crypto.createHmac('sha256', secret)
                       .update(req.param('password'))
                       .digest('hex');

    if (req.param('email') == "" || req.param('password') == "")
    {
        req.flash('info', 'Punten, tidak boleh ada field yang kosong!');
        res.redirect('/login');
    }
    else
    {
        User.find({ email: req.param('email'), password:password }, function(err, user){
        if (err) throw err;

        if (user.length > 0)
        {
            session_store.email = user[0].email;
            session_store.logged_in = true;

            res.redirect('/')
        }
        else
        {
            req.flash('info', 'sepenuhnya akun anda selain');
            res.redirect('/login');
        }
        });
    }
}

exports.logout = function(req, res, next) {
    req.session.destroy(function(err){
        if(err){
            console.log(err);
        }
        else
        {
            res.redirect('/login');
        }
    });
}

exports.demo1 = function(req, res, next){
    res.render(
                    'demo1',
                    {
                        message: 'Welcome to Express',
                        user: {name:'nanda', email:'nanda@example.com', website: 'http://www.nanda.com'}
                    }
    );
}

exports.demo2 = function(req, res, next){
    res.render(
                    'demo2',
                    {
                        id: req.params.id,
                        category: req.params.category,
                    }
    );
}

exports.demo3 = function (req, res, next){
    res.render('demo3');
}

exports.demo4 = function (req, res, next){
    res.json(
                {
                message: "request POST is executed",
                data: {
                    username: req.param('username'),
                    email: req.param('email'),
                    website: req.param('website'),
                    phone: req.param('phone'),
                   }
                }
            );
    }

exports.demo5 = function(req, res, next){
    res.render('demo5');
}

exports.demo6 = function(req, res, next){
    res.render('demo6');
}

exports.latihan = function(req, res, next){
    res.render('latihan');
}

exports.about = function(req, res, next){
    res.render('about');
}
exports.contact = function (req, res, next){
    res.render('contact');
}
exports.contact2 = function(req, res, next){
    res.render('contact2',
                {
                  
                    user: {email: req.param('email')
                }
            }
    );
}
