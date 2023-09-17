const mongoose = require("mongoose");

// const ImageSchema = new mongoose.Schema({
//     url: String,
//     filename: String
// });

// ImageSchema.virtual('thumbnail').get(function () {
//     return this.url.replace('/upload', '/upload/w_200');
// });

const spotSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: {type: String},
    Type: {type: String, required: true},
    description: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true },

});

module.exports = mongoose.model("Spot",spotSchema);