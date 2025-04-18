const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./config');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Authorization token missing or invalid" });
    }

    const token = authHeader.split(" ")[1];

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