import { configDotenv } from "dotenv";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"


configDotenv();

const JWT_SECRET = process.env.JWT_SECRET;

export const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token || token.startsWith("Bearer")) {
        res.status(403).json({
            msg: "Token is undefined"
        })
    }

    try {
        const decoded = jwt.verify(token as string, JWT_SECRET as string);
        // console.log(decoded); { userId: '67fe236c8cea7e638ef526df', iat: 1744708460 }
        // Access userId from the decoded token
        req.userId = (decoded as JwtPayload).userId;
        next();

    } catch (error) {
        res.status(403).send({
            msg: "Incorrect credentials"
        })
    }
}