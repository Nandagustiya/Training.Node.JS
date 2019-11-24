var mongoose = require('mongoose');
var crypto = require('crypto');

var secret = 'framework';
var password = crypto.createHmac('sha256', secret)
                    .update('nanda12345')
                    .digest('hex');
            
console.log("Password: " + password);

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/express');

var User = require('../models/user');

User.find({email:'nanda@gmail.com'}, function (err, user){
    if (user.length == 0)
    {
        var admin = new User({
            email: 'nanda@gmail.com',
            password: password,
        });

        admin.save(function(err){
            if (err) throw err;

            console.log('Admin is created');
        });
    }
});