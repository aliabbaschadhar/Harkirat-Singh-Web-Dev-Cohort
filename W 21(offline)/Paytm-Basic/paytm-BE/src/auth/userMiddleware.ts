import { configDotenv } from "dotenv";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"

// declare global {
//     namespace Express {
//         export interface Request {
//             userId?: string,
//         }
//     }
// }

configDotenv();

const JWT_SECRET = process.env.JWT_SECRET;

export const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;


    try {
        const decoded = jwt.verify(token as string, JWT_SECRET as string);
        console.log(decoded);
        // Will return the user
        req.userId = (decoded as JwtPayload).id;
        next();

    } catch (error) {
        res.status(403).send({
            msg: "Incorrect credentials"
        })
    }
}