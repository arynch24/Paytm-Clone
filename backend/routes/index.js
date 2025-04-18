const express = require('express');
const router = express.Router();
const userRouter = require('./user');
const accountRouter = require('./account');

//here i am just saying that if the request comes at '/user' go to userRouter and so on..
router.use('/user',userRouter);
router.use('/account',accountRouter);


module.exports = router;