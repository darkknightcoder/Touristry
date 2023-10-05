const mongoose = require("mongoose");
const Review=require('./reviews');
const Schema=mongoose.Schema;
// const ImageSchema = new mongoose.Schema({
//     url: String,
//     filename: String
// });

// ImageSchema.virtual('thumbnail').get(function () {
//     return this.url.replace('/upload', '/upload/w_200');
// });

const opts = { toJSON: { virtuals: true }};

const spotSchema = new Schema({
    name: { type: String, required: true },
    image: { type: String },
    Type: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    author: {
        type : Schema.Types.ObjectId , 
        ref:'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
}, opts);

spotSchema.post('findOneAndDelete', async function(doc){
    if(doc){
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongoose.model("Spot", spotSchema);