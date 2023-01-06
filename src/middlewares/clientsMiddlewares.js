import joi from 'joi';

export async function clientsMiddlewares(req, res, next) {
    const [name, adress, phone] = req.body;

    // Schema
    const schema = joi.object({
        name: joi.string().required(),
        adress: joi.string().required(),
        phone: joi.string().required(),
    });

    // Validation
    const validation = schema.validate(req.body);

    if (validation.error) {
        return res.status(400).send(validation.error.details[0].message);
    }
    
    next();
}