const express = require("express");
const cors = require('cors');

const connects = require("./database/connection")
const authRoute = require("./routes/authRoute")
const recipeRoute = require("./routes/recipeRoute")
const userRoute = require("./routes/userRoute")

const app = express();
require("dotenv").config();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoute);
app.use("/api/recipes", recipeRoute);
app.use("/api/user", userRoute);

const start = async ()=>{
    try {
        await connects(process.env.MONGO_URL)
        app.listen(port,()=>{
            console.log(`App running on port ${port}`);
        })        
    } catch (error) {
        console.log(error);
    }
}

start()
