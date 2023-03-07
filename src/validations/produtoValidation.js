import { validate, Joi } from "express-validation";

const validationRules = {
    body: Joi.object({
        nome: Joi.string().required(),
        foto: Joi.any(),
        preco: Joi.number().required(),
        quantidade: Joi.number().required(),
        descricao: Joi.string().required(),
        categoria: Joi.required(),
    })
};

export default validate(validationRules);