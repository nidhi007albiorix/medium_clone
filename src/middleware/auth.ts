import { NextFunction,Request, Response} from "express";
import { decode } from "jsonwebtoken";

export async function auth(req:Request, res:Response, next:NextFunction) {
    const authHeader= req.header('Authorization')?.split(" ")
    if(!authHeader) return res.status(401).json({
        errors:{body:['Authorization failed', 'No Authorization header']}
    })
    if(authHeader[0] != 'Token') return res.status(401).json({
        errors:{body:['Authorization failed', 'Token is missing']}
    })
    const token =authHeader[1];
    try {
        const loginUser =await decode(token);
        if(!loginUser) throw new Error("No user found in token");
        (req as any).user =loginUser
        return next()
    } catch (error) {
        return res.status(401).json({
            errors:{body:['Authorization failed']}
        })
    }


}