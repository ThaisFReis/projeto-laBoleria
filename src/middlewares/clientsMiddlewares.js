import joi from 'joi';

export async function clientsMiddlewares(req, res, next) {
    const { name, address, phone } = req.body;

    // Schema
    const schema = joi.object({
        name: joi.string().required(),
        address: joi.string().required(),
        phone: joi.string().min(10).max(11).required()
    });

    // Validation
    const validation = schema.validate(req.body);

    if (validation.error) {
        return res.status(400).send(validation.error.details[0].message);
    }

    // The name, the address and the phone can't be empty
    if (name === "" || address === "" || phone === "") {
        return res.status(400).send("Nenhum campo pode estar vazio");
    }

    // The phone has to have 10 or 11 digits
    if (phone.lenght < 10 || phone.lenght > 11) {
        return res.status(400).send("O telefone deve ter de 10 a 11 dígitos");
    }
    
    next();
}