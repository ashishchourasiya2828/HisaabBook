const express = require("express");
const router = express.Router();
const hisaabmodel = require("../models/hisaab-model")

const {isLoggedin,redirectToprofile,checkPassword}= require("../middlewares/index");
const { hisaabPageControllers,
       hisaabCreateControllers,
       passcodeVerifyControllers,
       hisaabViewControllers,
       hisaabDeleteControllers,
       hisaabEditControllers,
       hisaabPostEditControllers,
       hisaabShowControllers,
       hisaabShareControllers,
       hisaabViewShareControllers
    } = require("../controllers/hisaab-controllers");

router.get("/create",isLoggedin,hisaabPageControllers);
router.get("/view/:id",isLoggedin,hisaabViewControllers);
router.get("/delete/:id",isLoggedin,hisaabDeleteControllers);
router.get("/edit/:id",isLoggedin,hisaabEditControllers);
router.get("/view",isLoggedin,hisaabShowControllers);
router.get("/share/:id",isLoggedin,hisaabShareControllers)    
router.get("/share/view/:id",hisaabViewShareControllers);
router.get("/",async (req,res)=>{
    const hisaab =  await hisaabmodel.find()
    res.json(hisaab)
})

router.post("/create",isLoggedin,hisaabCreateControllers);
router.post("/:id/verify",isLoggedin,passcodeVerifyControllers);
router.post("/edit/:id",isLoggedin,hisaabPostEditControllers);



module.exports = router;