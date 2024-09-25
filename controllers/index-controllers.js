const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userModel = require("../models/user-model");
const { use } = require("../routes/indexRouter");



module.exports.loginController = function (req, res) {
    res.render("index", { isLoggedin: false, error: req.flash("error") });
}

module.exports.registerController = function (req, res) {
    res.render("register", { isLoggedin: false, error: req.flash("error") });
}

module.exports.registerPostController = async function (req, res) {
    let { name, username, email, password } = req.body;

    if (!name || !username || !password || !email ) {
        req.flash("error", "all fields are required");
        return res.redirect("/register");
    }
    if(name.length < 3) {
        req.flash("error", "name must be at least 3 characters long");
        return res.redirect("/register");
    } 
    if(username.length < 3){
        req.flash("error", " username must be at least 3 characters long");
        return res.redirect("/register");
    }
    console.log(password.length);
    if(password.length < 4){
        req.flash("error", "password must be at least 4 characters long");
        return res.redirect("/register");
    }




    try {
        let user = await userModel.findOne({ email });
        if (user) {
            req.flash("error", "user already exist");
            return res.redirect("/register");
        }
        let emailuser = await userModel.findOne({ username })
        if (emailuser) {
            req.flash("error", "username already exist");
            return res.redirect("/register");
        }

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                user = await userModel.create({
                    name, username, email,
                    password: hash
                })
                let token = jwt.sign({ email, userid: user._id }, process.env.JWT_KEY);
                res.cookie("token", token);
                res.redirect("/");
            });
        });

    }
    catch (error) {
        req.send("error", "something happen error 404");
        return res.redirect("/");
    }


}

module.exports.loginPostController = async function (req, res) {
    let { email, password } = req.body;

    if (!email || !password) {
        req.flash("error", "all fields are required")
        return res.redirect("/");
    }

    try {
        let user = await userModel.findOne({ email });
        if (!user) {
            req.flash("error", "you have to registered first");
            return res.redirect("/");
        }
        let result = await bcrypt.compare(password, user.password);
        // console.log(result);
        if (result) {
            let token = await jwt.sign({ email, userid: user._id }, process.env.JWT_KEY);
            //   console.log(token);
            res.cookie("token", token);
            return res.redirect("/profile");
        }
        else {
            req.flash("error", "Email or password is incorrect");
            res.redirect('/');
        }



    }
    catch (err) {
        req.flash("error", "something happen error 404");
        return res.redirect("/");
    }
}

module.exports.logoutControllers = async function (req, res) {
    res.cookie("token", "");
    res.redirect("/");
}

module.exports.profileControllers = async function (req, res) {

    let byDate = Number(req.query.byDate);
    let { startDate, endDate } = req.query;

    byDate = byDate ? byDate : -1;
    startDate = startDate ? startDate : new Date("1980-01-01");
    endDate = endDate ? endDate : new Date();

    let user = await userModel.findOne({ email: req.user.email }).populate({
        path: "hisaabs",
        match: { createdAt: { $gte: startDate, $lte: endDate } },
        options: { sort: { createdAt: byDate } }
    });
    res.render("profile", { user: user, error: req.flash("error") });
}

