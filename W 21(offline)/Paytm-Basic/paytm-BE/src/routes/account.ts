import { Request, Router, Response } from "express";
import { userMiddleware } from "../auth/userMiddleware";
import { accountModel } from "../db/schema";

const accountRouter = Router();

accountRouter.get("/balance", userMiddleware, async (req: Request, res: Response) => {
    const userId = req.userId;

    const userAccount = await accountModel.findOne({
        userId: userId
    })

    userAccount &&
        res.status(200).json(
            {
                msg: `You account balance is: ${userAccount.balance}`,
                balance: userAccount.balance
            }
        )
})


export { accountRouter }