const express = require('express');
const router = express.Router();
const zod = require('zod');
const { User, Accounts } = require('../db');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const { authMiddleware } = require('../middleware');

router.use(express.json());

const userSchema = zod.object({
    username: zod.string(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string()
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
            message: "Existing user SignIn"
        })
    }
    const user = await User.create({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
    })
    const userId = user._id;

    //Create a new Account 
    await Accounts.create({
        userId,
        balance: 1 + Math.random() * 10000
    })

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

    const validUser = signInBody.safeParse(req.body);

    if (!validUser) {
        return res.status(411).json({
            "message": "Invalid Input"
        })
    }

    const existingUser = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if (!existingUser) {
        return res.status(411).json({
            message: "Error while logging in"
        })
    }

    const userId = existingUser._id;
    const token = jwt.sign({ userId }, JWT_SECRET);

    res.status(200).json({
        token: token
    })
})

const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

router.put('/', authMiddleware, async (req, res) => {

    const success = updateBody.safeParse(req.body);
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

router.get('/bulk', async (req, res) => {

    const filter = req.query.filter || "";

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
        users: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

module.exports = router;