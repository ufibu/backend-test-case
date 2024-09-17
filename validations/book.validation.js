const Joi = require('joi');

const borrow = {
    body: Joi.object().keys({
        bookCode: Joi.string().required(),
        userCode: Joi.string().required()
    })
};

const returns = {
    body: Joi.object().keys({
        bookCode: Joi.string().required(),
        userCode: Joi.string().required()
    })
};

module.exports = {
    borrow,
    returns
};