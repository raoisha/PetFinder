const express = require('express');

//
const { demoCall } = require('../controllers/demoController.js');
const { getLogin, registerUser,setLogin,signout } = require('../controllers/loginController.js');
const { lostPetInfo,displayLostPetInfo,readLostPetDetail,foundPetInfo ,displayFoundPetList,displayFoundPetDetails} = require('../controllers/petController.js');
const { sendOwnerEmail } = require('../controllers/emailController.js');
const router = express.Router();

// demo
router.route('/demoCall').post(demoCall);

router.route("/register").post(registerUser);
router.route("/signin").post(setLogin).get(getLogin);
router.route("/signout").get(signout);

router.route("/lostpetinfo").post(lostPetInfo);
router.route("/displaylostpetinfo").get(displayLostPetInfo);
router.route("/readLostPetDetail/:id").get(readLostPetDetail);

router.route("/foundpetinfo").post(foundPetInfo);
router.route("/displayfoundpetlist").get(displayFoundPetList);
router.route("/displayfoundpetdetails/:id").get(displayFoundPetDetails);


router.route("/sendemail").post(sendOwnerEmail);

module.exports = router;


