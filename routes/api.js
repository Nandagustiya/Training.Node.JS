var express =  require('express');
//var User = require('../models/user');
var router =  express.Router();

let api = require('../controllers/api');

router.get('/', api.index);

router.route('/contacts')
    .get(api.notif)
    .post(api.new);
router.route('/contacts/:contact_id')
    .get(api.view)
    .patch(api.update)
    .put(api.update)
    .delete(api.delete);

module.exports = router;