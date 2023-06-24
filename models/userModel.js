const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true, "Please enter a username"],
    },
    email:{
        type:String,
        required:[true, "Please enter an email adress"],
        unique:[true, "email already exist"],
    },
    password:{
        type:String,
        required:[true, "Please enter a password"],
        minlength:[5, "password too short"]
    }
})

module.exports = mongoose.model("user", userSchema);