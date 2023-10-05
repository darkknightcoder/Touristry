const Joi = require('joi');
const joi = require('joi');
const { number } = require('joi');

module.exports.spotSchema = Joi.object({
    spot: Joi.object({
        name: Joi.string().required(),
        price: Joi.number().required().min(0),
        Type: Joi.string().required(),
        image: Joi.string().required(),
        location: Joi.string().required(),
        description: Joi.string().required()
    }).required()
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        body: Joi.string().required()
    }).required()
})