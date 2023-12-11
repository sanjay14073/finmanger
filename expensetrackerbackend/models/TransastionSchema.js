const mongoose = require('mongoose');

const transactions = new mongoose.Schema({
    "tof": {
        required: true,
        type: String,
    },
    "category": {
        required: true,
        type: String,
    },
});

const Transactions = mongoose.model("Transactions", transactions);
module.exports.Transactions = Transactions;
