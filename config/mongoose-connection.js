const mongoose= require("mongoose");


mongoose.connect(process.env.MONGODB_URI).then(function(){
    console.log("connected to database");
})

module.exports = mongoose.connection;