import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
import { getTokenSourceMapRange } from "typescript";

dotenv.config(); // To load the .evn


const SECRET = process.env.JWT_SECRET;

export const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
        res.status(403).send({
            msg: "No token provided",
        });
        return;
    }

    //Checking the validity of JWT_SECRET
    if (!SECRET) {
        res.status(403).send({
            msg: "JWT is undefined",
        });
        return;
    }

    try {
        const decoded = jwt.verify(token as string, SECRET);
        //@ts-ignore
        req.userId = decoded.id;
        next();
    }
    catch (error) {
        res.status(403).send({
            msg: "Incorrect credential",
        });
    }
}
