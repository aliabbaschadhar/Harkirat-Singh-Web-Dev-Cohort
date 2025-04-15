import { Request, Router, Response } from "express";
import { userMiddleware } from "../auth/userMiddleware";
import { accountModel } from "../db/schema";
import { z } from "zod"
import { startSession } from "mongoose";

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

// accountRouter.post("/transfer-badWay", userMiddleware, async (req: Request, res: Response) => {
//     const requiredBody = z.object({
//         to: z.string().email(),
//         amount: z.number().positive()
//     })

//     const { success } = requiredBody.safeParse(req.body);

//     if (!success) {
//         res.status(400).json({
//             msg: "Format is not correct"
//         })
//         return;
//     }

//     const { to, amount } = req.body;

//     try {
//         const account = await accountModel.findOne({
//             userId: req.userId
//         })

//         if (account) {
//             if (account?.balance < amount) {
//                 res.status(400).json({
//                     msg: "Insufficient balance"
//                 })
//             }
//         }

//         const toAccount = await accountModel.findOne({
//             userId: to
//         })

//         if (!toAccount) {
//             res.status(400).json({
//                 msg: "Enter valid accountId"
//             })
//         }

//         await account?.updateOne({
//             userId: req.userId
//         }, {
//             $inc: {
//                 balance: -amount,
//             }
//         })

//         await toAccount?.updateOne({
//             userId: to
//         }, {
//             $inc: {
//                 balance: amount
//             }
//         })

//         res.send(200).json({
//             msg: "Transfer successful"
//         })

//     } catch (error) {

//     }
// })

// ---------------------Using Transactions------------------------------

accountRouter.post("/transfer", userMiddleware, async (req: Request, res: Response) => {
    const requiredBody = z.object({
        to: z.string().email(),
        amount: z.number().positive(),
    })

    const { success } = requiredBody.safeParse(req.body);

    if (!success) {
        res.status(400).json({
            msg: "Format is not correct"
        })
        return;
    }

    const { to, amount } = req.body;

    try {

        async function transfer(req: Request) {
            const session = await startSession();
            session.startTransaction();

            const account = await accountModel.findOne({
                userId: req.userId
            }).session(session);

            if (!account || account.balance < amount) {
                session.abortTransaction();
                res.status(403).json({
                    msg: "Account does not exist or invalid balance"
                })
                return;
            }

            const toAccount = await accountModel.findOne({
                userId: to
            }).session(session);

            if (!toAccount) {
                session.abortTransaction();
                res.status(403).json({
                    msg: "Receiver's account not found"
                })
                return;
            }

            account.updateOne({
                balance: {
                    $inc: -amount
                }
            }).session(session)

            toAccount.updateOne({
                balance: {
                    $inc: amount
                }
            }).session(session);

            await session.commitTransaction();
        }

        transfer(req);

        res.status(200).json({
            msg: "Transaction successfull"
        })
    } catch (error) {
        res.status(409).json({
            msg: "Error happened during transaction",
            erorr: error
        })
    }
})


export { accountRouter }