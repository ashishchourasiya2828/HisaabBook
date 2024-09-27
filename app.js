const express = require("express");
const { env } = require("process");
const session = require("session");
const app = express();
const cookieparser = require("cookie-parser");

require('dotenv').config();

const indexRouter = require("./routes/indexRouter");
const hisaabRouter = require("./routes/hisaabRouter");
const db = require("./config/mongoose-connection");
const path = require("path");

const flash = require("connect-flash");
const expressSession = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const { clearHisaabPassword } = require("./middlewares");

const store = new MongoDBStore({
    uri:process.env.MONGODB_URI,
    collection:'sessions'
})

app.use(expressSession({
    secret: process.env.JWT_KEY, // Replace with a secure key
    resave: false,
    saveUninitialized: true,
    store:store
}));

app.use(flash());



app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));
app.use(cookieparser());

// app.use(clearHisaabPassword);

app.use("/",indexRouter);
app.use("/hisaab",hisaabRouter);




// process.on('uncaughtException',()=>{
//     console.log("errorr")
// })

app.listen(process.env.PORT || 3000);
