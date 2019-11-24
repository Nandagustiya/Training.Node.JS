var express = require('express');
var crypto = require('crypto');
var User = require('../models/user');
var Auth_mdw = require('../middlewares/auth');
var router = express.Router();
var secret = 'framework';
var session_store;

let user=require('../controllers/user');

router.get('/list', Auth_mdw.check_login, user.list);
router.get('/create', Auth_mdw.check_login, user.create);
router.post('/create_action', Auth_mdw.check_login, user.create_action);
router.get('/edit/(:id)', Auth_mdw.check_login, user.edit);
router.put('/edit_action/(:id)', Auth_mdw.check_login, user.edit_action);
router.delete('/delete/(:id)', Auth_mdw.check_login, user.delete);

module.exports = router;
