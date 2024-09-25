const mongoose = require("mongoose");


    
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true, // Ensures that the field is not empty
        minlength: 3, // Minimum length of the string
        maxlength: 100 // Maximum length of the string
    },
    username: {
        type: String,
        trim:true,
        required: [true,"username is required"],
        unique: true, // Ensures that usernames are unique across the collection
        minlength: 3, // Minimum length of the username
        maxlength: 50 // Maximum length of the username
    },
    email: {
        type: String,
        required: [true,"email is required"],
        trim:true,
        lowercase:true,
        unique: true, // Ensures that emails are unique across the collection
        match: [/^\S+@\S+\.\S+$/, 'Please fill a valid email address'] // Validates the email format
    },
    password: {
        type: String,
        required: [true,"password is required"],
        minlength: 4, // Minimum length of the password
        maxlength: 1024, // Maximum length of the password
        Select:false
    },
    profilePicture:{
        type:String,
        trim:true,
    },
    hisaabs:[
        {type:mongoose.Schema.Types.ObjectId,
            ref:"hisaab",
        }
    ]
},{timestamps:true});

module.exports = mongoose.model("user",userSchema);




