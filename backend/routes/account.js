const express = require('express');
const { authMiddleware } = require('../middleware');
const { Accounts } = require('../db');
const router = express.Router();


router.get('/balance',authMiddleware,async (req,res)=>{
    const userAccount = await Accounts.findOne({
        userId:req.userId
    })

    res.statq(200).json({
        balance:userAccount.balance
    })
})

module.exports = router;