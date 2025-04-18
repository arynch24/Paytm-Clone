const express = require('express');
const router = express.Router();
const zod = require('zod');
const User = require('../db');
const jwt = require('jsonwebtokem');
const { JWT_SECRET } = require('../config');
const { authMiddleware } = require('../middleware');

const userSchema = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.number()
})

router.post('/signup', async (req, res) => {

    const validUser = userSchema.safeParse(req.body);
    if (!validUser) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const existingUser = await User.findOne({ username: req.body.username });

    if (existingUser) {
        return res.status(411).json({
            message: "Email already taken/Incorrect inputs"
        })
    }
    const user = await User.create({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
    })
    const userId = user._id;
    const token = jwt.sign({ userId }, JWT_SECRET);

    res.json({
        message: "User created successfully",
        token: token
    })
})



const signInBody = zod.object({
    username: zod.string(),
    password: zod.string()
})

router.post('/signin', async (req, res) => {

    const { success } = signInBody.safeParse({
        username: req.body.username,
        password: req.body.password
    });

    if (!success) {
        return res.status(411).json({
            "message": "Invalid Input"
        })
    }

    const existingUser = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if (!existingUser) {
        res.status(411).json({
            message: "Error while logging in"
        })
    }

    const userId = existingUser._id;
    const token = jwt.sign(userId, JWT_SECRET);

    res.status(200).json({
        token: token
    })
})

const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

router.put('/user', authMiddleware, async (req, res) => {

    const { success } = updateBody.safeParse(req.body);
    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }

    await User.updateOne({ _id: req.userId }, {
        '$set': req.body
    })

    res.status(200).json({
        message: "Updated successfully"
    })

})

router.get('bulk', async (req, res) => {

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    if (!users) {
        res.json({
            "message": "Not Found"
        })
    }

    res.json({
        user :users.map(user=>({
            username:user.username,
            firstName:user.firstName,
            lastName:user.lastName,
            _id:user._id
        }))
    })
})





module.exports = router;