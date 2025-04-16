import jwt, { JwtPayload } from "jsonwebtoken"
import { Request, Response, NextFunction } from "express";
import { configDotenv } from "dotenv";


declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}


configDotenv();
const JWT_SECRET = process.env.JWT_SECRET ?? "";

export const middleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization ?? "";

    const decoded = jwt.verify(token, JWT_SECRET);

    if (decoded) {
        req.userId = (decoded as JwtPayload).userId;
        next();
    } else {
        res.status(403).json({
            msg: "Unauthorized"
        })
    }
}