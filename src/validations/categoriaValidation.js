import { validate, Joi } from "express-validation";

const validationRules = {
    body: Joi.object({
        nome: Joi.string().required(),
    })
};

export default validate(validationRules);