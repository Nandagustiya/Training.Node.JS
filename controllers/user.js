var express = require('express');
var crypto = require('crypto');
var User = require('../models/user');
var Auth_mdw = require('../middlewares/auth');
var router = express.Router();
var secret = 'framework';
var session_store;

var default_password = crypto.createHmac('sha256', secret)
                    .update('dafault')
                    .digest('hex');

exports.list = function(req, res, next) {
    session_store = req.session;

    //res.render('users/list');
    User.find({}, function(err, user){
        console.log(user);
        res.render('users/list', { session_store:session_store, users: user });
    }).select('email password');
}

exports.create = function(req, res, next) {
    session_store = req.session;
    res.render('users/create', { session_store:session_store });
}

//create action
exports.create_action = function(req, res, next) {
    session_store = req.session;
    req.assert('email', 'E-mail tidak valid').notEmpty().withMessage('E-mail di perlukan').isEmail();

    var errors = req.validationErrors();
    console.log(errors);

    if (!errors)
    {
        v_email = req.sanitize( 'email' ).escape().trim();

        User.find({email:req.param('email')}, function (err, user){
            if (user.length == 0)
            {
                var admin = new User({
                    email: v_email,
                    password: default_password,
                });

                admin.save(function(err){
                    if (err)
                    {
                        console.log(err);

                        req.flash('msg_error', 'System is crashed');
                        res.redirect('/users/list');
                    }
                    else
                    {
                        req.flash('msg_info', 'User Berhasil Dibuat');
                        res.redirect('/users/list');
                    }
                });
            }
            else
            {
                req.flash('msg_error', 'Email sudah ada')
                res.render('users/create', {
                    session_store:session_store,
                    email: req.param('email'),
                });
            }
        });
    }
    else
    {
    //menampilkan pesan error
    errors_detail = "<p>Data salah!</p><ul>";

    for (i in errors)
    {
        error = errors[i];
        errors_datail += '<li>'+error.msg+'</li>';
    }

    errors_detail += "</ul>";

    req.flash('msg_error', errors_detail);
    res.render('users/create', {
        session_store: session_store,
        email: req.param('email'),
    });
}

}
//untuk edit user
exports.edit = function(req, res, next){
    session_store = req.session;

    User.findOne({_id:req.params.id}, function (err, user){
        res.render('users/edit', { session_store:session_store, user: user});
    });
}
//untuk action edit nya
exports.edit_action = function(req, res, next){
    session_store = req.session;

    req.assert('email', 'E-mail tidak valid').notEmpty().withMessage('E-mail di perlukan').isEmail();

    var errors = req.validationErrors();
    console.log(errors);

    if (!errors)
    {
        v_email = req.sanitize( 'email' ).escape().trim();

        User.findById(req.params.id, function(err, user){
            user.email = req.param('email');

            user.save(function(err, user){
                if (err)
                {
                    req.flash('msg_error', 'System is crashed');
                }
                else
                {
                    req.flash('msg_info', 'Edit user berhasil!');
                }

                res.redirect('/users/list');
            });
        });
    }
    else
    {
        //menampilkan pesan error
        errors_detail = "<p>Data salah!</p><ul>";

        
        for (i in errors)
        {
            error = errors[i];
            errors_detail += '<li>' +error.msg+'</li>';
        }

        errors_detail += "</ul>";

        req.flash('msg_error', errors_detail);
        res.render('users/edit', {
            _id: req.params.id,
            session_store: session_store,
            email: req.param('email'),
        });
    }
}

exports.delete = function(req, res, next) {
    User.findById(req.params.id, function(err, user){
        user.remove(function(err, user){
            res.redirect('/users/list');
        });
    });
}