const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true, "Provide a title"]
    },
    desc:{
        type:String,
        required:[true,"Give a description"]
    },
    prep_duration:String,
    cook_duration:String,
    ingridients:[String],
    images:[String],
    vid:String,
    instructions:{
        type:String,
        required:[true, "Enter the steps"]
    },
    postedOn:{
        type:Date,
        default:Date.now()
    },
    owner: {
        type: String,
        required:true
    },
    thumbnail:String,
    rating:Number
},
{timestamps:true})

module.exports = mongoose.model("recipe", recipeSchema)