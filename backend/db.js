const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://arynch24:acuPBrkfuQK3BgPe@cluster-100xdev.6ifyamk.mongodb.net/paytmclone')


//new to learn 
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLenght: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
});

const User = mongoose.model("Users", userSchema);

module.exports = {
    User
}
