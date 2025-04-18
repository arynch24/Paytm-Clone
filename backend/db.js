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

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true,
    },
    //should not be float in india it should be upto 2-4 decimal places and we need to store 7777 in database but to show 77.77 on frontend for balance 77.77
    balance: {
        type: Number,
        required: true
    }
})


const Accounts =mongoose.model('Accounts',accountSchema);
const User = mongoose.model("Users", userSchema);

module.exports = {
    User,
    Accounts
}
