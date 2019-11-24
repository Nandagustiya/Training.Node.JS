var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    password: { type: String, required: true},
    email: { type: String, required: true},
},
{
    timestamps: true
});

var User = mongoose.model('User', userSchema);

module.exports = User;