import joi from 'joi';

export async function cakesMiddlewares(req, res, next) {
    const { name, price, image, description } = req.body;
    
    // Schema to validate the request body
    const schema = joi.object({
        name: joi.string().required(),
        price: joi.number().required(),
        image: joi.string().required(),
        description: joi.string().required()
    });

    // Validation
    const validation = schema.validate(req.body);

    if (validation.error) {
        return res.status(400).send(validation.error.details[0].message);
    }

    next();
}