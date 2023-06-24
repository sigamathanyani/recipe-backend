const express = require("express");
const auth = require("../middlewares/authMiddleware")

const {updateAccount, 
    deleteAccount,
    userRecipes,
    getUsers
    } = require("../controllers/userController")

const route = express.Router()

route.get("/",getUsers);
route.get("/user-recipes/:userId",userRecipes);
route.delete("/delete-acc/:userId",auth,deleteAccount);
route.put("/update-acc/:userId",auth,updateAccount);

module.exports = route;