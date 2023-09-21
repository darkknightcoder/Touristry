const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    contribution: [
        {
            spotID: { type: mongoose.Schema.Types.ObjectId, ref: 'Spot' },
            reviewID: { type: mongoose.Schema.Types.ObjectId, ref: 'Review' }
        }
    ]
});

module.exports = mongoose.model("User", userSchema);