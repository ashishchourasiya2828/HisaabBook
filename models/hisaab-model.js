const mongoose = require("mongoose");

try {
    
const hisaabSchema = mongoose.Schema({
    title: { type: String, required: [true ,"title is required"],trim:true,minLength:3,maxLength:100 },
    description: { type: String, required: [true ,"description is required"],trim:true },
    user: { type: mongoose.Schema.Types.ObjectId,ref:"user"}, // Assuming user is a String, adjust as per your data model
    shareable: { type: Boolean, default: false }, // Assuming shareable is a boolean
    encrypted: { type: Boolean, default: false }, // Assuming encrypted is a boolean
    passcode: { type: String ,default:""}, // Assuming passcode is a String
    editpermissions: { type: Boolean, default: false },
    shareToken:{type:String,dafault:false} // Assuming editpermission is a boolean
},{timestamps:true});

module.exports = mongoose.model("hisaab",hisaabSchema);
}
catch(err) { 
    res.send(err);
}




