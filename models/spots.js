const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
    url: String,
    filename: String
});

ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200');
});

const spotSchema = new mongoose.Schema({
    name: { type: String, required: true },
    images: [ImageSchema],
    description: { type: String, required: true },
    avgRate: { type: String, required: true },
    location: { type: String, required: true },

});

module.exports = mongoose.model("Spot,spotSchema");