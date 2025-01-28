import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config(); // To load the .evn


const SECRET = process.env.JWT_SECRET;

export interface CustomRequest extends Request {
    userId?: string,
}

// export const userMiddleware = (req: Request, res: Response, next: NextFunction) => 

export const userMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!SECRET) {
        return res.status(403).send({
            msg: "JWT is undefined",
        });
    }
    // ******************** THE UGLY APPROACH TO DEAL WITH TYPE ASSERTION ******************** //
    // try {

    // (token as string) is a type case that tells typescript to treat the token variable as a string.
    // This is necessary bcz the jwt.verify() function expects a string as the first argument.

    //     const decoded = jwt.verify(token as string, SECRET) as { id: string };

    // The " as {id : string}" part is a type assertion that tells typescript to treat the decoded token as an object with a "id" property that is a string.

    //     (req as any).userId = decoded.id;

    // The "(req as any)" part is a type assertion that tells typescript to treat the req object as any type.
    // By using the "(req as any)" part, we are telling TS to trust us and allow us to assign a value to a property that doesn't exist on the Request Object.

    //     next();
    // } 

    // *************************** THE BETTER APPROACH BY EXTENDING THE REQUEST OBJECT *************************** //
    try {
        const decoded = jwt.verify(token as string, SECRET) as { id: string };
        req.userId = decoded.id;
        next();
    }
    catch (error) {
        res.status(403).send({
            msg: "Incorrect credential",
        });
    }
}
