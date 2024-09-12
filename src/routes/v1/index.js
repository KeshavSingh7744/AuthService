
const express = require('express');

const UserController = require('../../controllers/user-controller');
const {authRequestValidators} = require('../../middlewares/index');

const router = express.Router();

router.post('/signup',authRequestValidators.validateUserAuth,UserController.create);

router.post('/signin',authRequestValidators.validateUserAuth,UserController.signIn);

router.get('/isAuthenticated',UserController.isAuthenticated);

router.get('/isAdmin',authRequestValidators.validateIsAdmin,UserController.isAdmin);


module.exports = router;
