var express = require('express');
var crypto = require('crypto');
var User = require('../models/user');
var Auth_mdw = require('../middlewares/auth');
var router = express.Router();
var secret = 'framework';
var session_store;

let index=require('../controllers/index');
/*get hOME page */
router.get('/', Auth_mdw.check_login, index.index);
/*Login and Register*/
router.get('/login/', index.login);
router.post('/checklogin/', index.checklogin);
router.get('/logout/', index.logout);
/*router.get('/register', index.register);*/




/*mengirim Variabel ke Template 
router.get('/demo1', index.demo1);

/* Demo 2 - parameter di URL 
router.get('/demo2/(:id)/(:category)', index.demo2);

/* DEMO 3-4 menerima request method POST dari from 
router.get('/demo3/', index.demo3);
router.post('/demo4/', index.demo4);

/* DEMO 5-6 redirect url 
router.get('/demo5/', index.demo5);
router.get('/demo5_result/', index.demo6);

/*latihan 
router.get('/latihan/', index.latihan);
router.get('/about/', index.about);
router.get('/contact/', index.contact);
router.post('/contact2/', index.contact2);*/



module.exports = router;
