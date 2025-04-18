const express = require('express');
const { authMiddleware } = require('../middleware');
const { Accounts } = require('../db');
const { default: mongoose } = require('mongoose');
const router = express.Router();

router.use(express.json());

router.get('/balance', authMiddleware, async (req, res) => {
    const userAccount = await Accounts.findOne({
        userId: req.userId
    })

    res.status(200).json({
        balance: userAccount.balance
    })
})


//we need to ensure that a complete transaction should happen without any failure
//If something crashes in between the transaction should be rolled back
//samajh gaye?

//session also prevents from happening another transaction from the same user if any transaction is ongoing
router.post('/transfer', authMiddleware, async (req, res) => {
    //for that we will use balancesession provided by  mongoose

    const session = await mongoose.startSession();

    session.startTransaction();

    const { to, amount } = req.body;

    const senderAccount = await Accounts.findOne({ userId: req.userId }).session(session);
    if (senderAccount.balance < amount) {
        res.status(400).json({
            message: "Insuficient Balance"
        })
    }

    const reciversAccount = await Accounts.findOne({ userId: to }).session(session);
    if (!reciversAccount) {
        res.status(400).json({
            message: "Insuficient Balance"
        })
    }

    //decrease balance of senders account
    await Accounts.updateOne({ userId: req.userId }, {
        '$inc': {
            balance: -amount
        }
    }).session(session)

    //increase balance of recivers
    await Accounts.updateOne({ userId: to }, {
        '$inc': {
            balance: amount
        }
    }).session(session)

    // Commit the transaction
    await session.commitTransaction();

    res.json({
        message: "Transfer successful"
    })


})

module.exports = router;