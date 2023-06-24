const User = require("../models/userModel");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const register = async (req,res)=>{

    const salt = bcrypt.genSaltSync(10);
    const hashedPass = bcrypt.hashSync(req.body.password, salt);

    const user = new User({
        username:req.body.username,
        password:hashedPass,
        email:req.body.email
    });

    try {
        await user.save();
        const { password ,...others} = user._doc;
        res.status(201).json(others);
    } catch (error) {
        console.log(error);
    }
}

const login = async (req,res)=>{
    
    const user = await User.findOne({username:req.body.username});

    if(!user) return res.send('No User found');
    

   const userPass = await bcrypt.compareSync(req.body.password, user.password);
    if(!userPass) return res.send("Wrong Credentials");
    

    const token = jwt.sign({id:user._id,username:user.username},
        process.env.JWT_SECRET);

       // req.headers = token;

    const { password ,...others} = user._doc;
   
    res.status(200).send({...others,token:token});
}

module.exports = {login, register};