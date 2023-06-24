const User = require("../models/userModel");
const Recipe = require("../models/recipeModel");

const getUsers = async (req,res)=>{
    try{
        const users = await User.find({});
        res.send(users);        
    }catch(e){
        console.log(e);
    }

}

const updateAccount = async (req,res)=>{
    try{

        if(req.user.id === req.params.userId){
            const newRecipe = await User.findByIdAndUpdate({_id:req.params.recipeId},req.body,{new:true});
            res.send(newRecipe);
            return;
        }

    }catch(err){
        console.log(err)
    }
    
    res.send("You are not the owner of the account")
}

const deleteAccount = async (req,res)=>{

    try{
        if(req.user.id === req.params.userId){
            await User.findByIdAndDelete({_id:req.user.id})
            await Recipe.deleteMany({owner:req.params.userId});
            res.send("User has been delete");
            return;
        }

        res.send("You are not allowed to delete the accoount");
    }catch(err){
        console.log(err)
    }
}

const userRecipes = async (req,res)=>{
    const allUserRecipes = await Recipe.find({owner:req.params.userId});
    res.send(allUserRecipes);
}

module.exports = {updateAccount, deleteAccount,userRecipes,getUsers}