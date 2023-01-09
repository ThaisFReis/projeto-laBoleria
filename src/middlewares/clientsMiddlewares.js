import joi from 'joi';

export async function clientsMiddlewares(req, res, next) {
    const [name, adress, phone] = req.body;

    // Schema
    const schema = joi.object({
        name: joi.string().required(),
        adress: joi.string().required(),
        phone: joi.string().min(10).max(11).required()
    });

    // Validation
    const validation = schema.validate(req.body);

    if (validation.error) {
        return res.status(400).send(validation.error.details[0].message);
    }

    // The name, the adress and the phone can't be empty
    if (name === "" || adress === "" || phone === "") {
        return res.status(400).send("Nome, endereço e telefone não podem ficar em branco");
    }
    
    next();
}