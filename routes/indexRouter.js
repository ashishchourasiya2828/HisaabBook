const express = require("express");
const router = express.Router();
const {isLoggedin,redirectToprofile}= require("../middlewares/index");
const {loginController,registerController,registerPostController,loginPostController, logoutControllers, profileControllers} = require("../controllers/index-controllers");

router.get("/",redirectToprofile,loginController);
router.get("/register",redirectToprofile,registerController);
router.get("/logout",logoutControllers);
router.get('/profile',isLoggedin,profileControllers);

router.post("/register",registerPostController);
router.post('/login',loginPostController);

module.exports= router;