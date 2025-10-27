import jwt from "jsonwebtoken";

const JWT_SECRET_KEY=process.env.JWT_SECRET_KEY;

function authMiddleware(req,res,next){
    const token=req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(401).json({message: "Token not provided"});
    }
    const decoded=jwt.verify(token,JWT_SECRET_KEY);
    req.userId=decoded.userId;
    next();
}

export default authMiddleware;