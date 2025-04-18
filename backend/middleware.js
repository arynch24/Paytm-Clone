const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./config');

const authMiddleware = (req, res, next) => {
    const string = req.headers.authorization;
    const words = string.split(" ");
    const token = words[1];

    //returns a payload
    const decoded = jwt.verify(token, JWT_SECRET);

    if (decoded) {
        req.userId = decoded.userId;
        next();
    }

    else {
        res.status(403).json({
            message: "User not verified"
        })
    }
}

module.exports ={
    authMiddleware
}