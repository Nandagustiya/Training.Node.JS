var mongoose =  require('mongoose');
var Schema = mongoose.Schema;

//setup schema
var contactSchema =  new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    gender: String,
    phone: String,
    create_date: { type: Date, default: Date.now }
});
//export Contact model
var Contact =  mongoose.model('Contact', contactSchema);

module.exports = Contact;