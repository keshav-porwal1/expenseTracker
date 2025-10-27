import User from "../models/user.js";

function authorizeRoles(...roles){
    return async function middleware(req,res,next){
        const userId=req.userId;
        const user=await User.findById(userId);
        if(!user){
            return res.status(404).json({message: "User Not Found"});
        }
        const role=user.role; 
        if(!roles.includes(role)){
            return res.status(403).json({message: "Access Denied"});
        }
        next();
    }
}

export default authorizeRoles;