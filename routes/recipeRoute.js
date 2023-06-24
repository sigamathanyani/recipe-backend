const express = require("express");

const {allRecipe,
    editRecipe,
    deleteRecipe,
    addRecipe} = require("../controllers/recipeController");

const auth =require("../middlewares/authMiddleware");

const route = express.Router();

route.get("/",allRecipe);
route.post("/add-recipe",auth,addRecipe);
route.delete("/:recipeId",auth,deleteRecipe);
route.put("/:recipeId",auth,editRecipe);

module.exports = route;