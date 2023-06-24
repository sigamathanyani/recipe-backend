const Recipe = require("../models/recipeModel");

const allRecipe = async (req,res)=>{
    const allRecipes = await Recipe.find({});
    res.send(allRecipes);
}

const addRecipe = async (req,res)=>{
    const userId = req.user.id;
    req.body.owner = userId;
    const recipe = new Recipe(req.body);

    try {
        const savedRecipe = await recipe.save();
        const {title, _id,owner, ...others} = savedRecipe;
        res.status(201).json({title, _id, owner})
    } catch (error) {
        console.log(error);
    }

}

const deleteRecipe = async (req,res)=>{
    
    try{
        const recipeToDelete = await Recipe.findOne({_id:req.params.recipeId});

        if(req.user.id === recipeToDelete.owner){
            await Recipe.findByIdAndDelete({_id:req.params.recipeId});
            res.send("Recipe deleted");
            return;
        }

    }catch(err){
        console.log(err)
    }
    
    res.send("You are not the owner of the recipe")
}

const editRecipe = async (req,res)=>{
    try{
        const recipeToEdit = await Recipe.findOne({_id:req.params.recipeId});

        if(req.user.id === recipeToEdit.owner){
            const newRecipe = await Recipe.findByIdAndUpdate({_id:req.params.recipeId},req.body,{new:true});
            res.send(newRecipe);
            return;
        }

    }catch(err){
        console.log(err)
    }
    
    res.send("You are not the owner of the recipe")
}


module.exports = {allRecipe,editRecipe,deleteRecipe,addRecipe};