const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next)=>{

    const authHeader = req.headers.token;

    if(!authHeader || !authHeader.startsWith("Bearier ")){
        return res.status(401).json({msg:"You are not authenticated"})
    }
    
    const token = authHeader.split(" ")[1];
    const user = jwt.verify(token,process.env.JWT_SECRET);
    req.user = user;
    next();

}

module.exports = verifyToken;