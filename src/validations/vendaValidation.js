import { validate, Joi } from "express-validation";

const validationRules = {
    body: Joi.object({
        produtos: Joi.array().required(),
    })
};

export default validate(validationRules);