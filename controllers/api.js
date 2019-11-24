// contactContorllers.js
var express =  require('express');
var router =  express.Router();
var Contact =  require('../models/contact');

exports.index = function(req, res, next) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to REST API in Express!'
    });
}
//notification
exports.notif = function (req, res, next) {
    Contact.find({}, function (err, contacts){
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Contact retrieved successfully",
            data: contacts
        });
    });
};

//create contact action
exports.new = function (req, res, next) {
    var contact =  new Contact({
        name: req.param('name'),
        gender: req.param('gender'),
        email: req.param('email'),
        phone: req.param('phone'),
    });
// save contact and check for error
    contact.save(function (err) {
        res.json({
            message: 'New contact created!',
            data: contact
        });
    });
};

//contact info
exports.view = function (req, res, next) {
    Contact.findById(req.params.contact_id, function (err, contact){
        if (err)
            res.send(err);
        res.json({
            message: 'Contact details loading..',
            data: contact
        });
    });
};

// update contact info
exports.update = function (req, res, next) {
    Contact.findById(req.params.contact_id, function (err, contact) {
        if (err)
            res.send(err);

        contact.name = req.body.name;
        contact.gender = req.body.gender;
        contact.email = req.body.email;
        contact.phone = req.body.phone;
        contact.save(function (err){
            if (err)
                res.json(err);
            res.json({
                message: 'Contact Info updated',
                data: contact
            });
        });
    });
};
//DELETE CONTACT
exports.delete = function (req, res, next) {
    Contact.remove({
    _id: req.params.contact_id
    }, function (err, contact){
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'Contact deleted'
        });
    });
};