const express = require('express');

//
const { demoCall } = require('../controllers/demoController.js');
const { getLogin, registerUser,setLogin,signout } = require('../controllers/loginController.js');
const { lostPetInfo } = require('../controllers/petController.js');

const router = express.Router();

// demo
router.route('/demoCall').post(demoCall);

router.route("/register").post(registerUser);
router.route("/signin").post(setLogin).get(getLogin);
router.route("/signout").get(signout);

router.route("/lostpetinfo").post(lostPetInfo);

module.exports = router;


