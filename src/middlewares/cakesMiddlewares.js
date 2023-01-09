import joi from 'joi';

export async function cakesMiddlewares(req, res, next) {
    const { name, price, image, description } = req.body;
    
    // Schema to validate the request body
    const schema = joi.object({
        name: joi.string().min(2).required(),
        price: joi.number().required(),
        image: joi.string().regex(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/).required(),
        description: joi.string()
    });

    // Validation
    const validation = schema.validate(req.body);

    if (validation.error) {
        return res.status(400).send(validation.error.details[0].message);
    }

    // The name must be unique 
    const nameExists = await connection.query(c`SELECT * FROM cakes WHERE name = $1`, [name]);
    if (nameExists.rowCount) {
        return res.status(409).send("Nome já existe");
    }

    // The name not be empty
    if (name === "") {
        return res.status(400).send("Nome não pode ser vazio");
    }

    // The price must be greater than 0 and not be empty
    if (price <= 0 || price === "") {
        return res.status(400).send("Preço deve ser maior que 0 e não pode ficar em branco");
    }

    // The image must be a valid URL
    if (!image.match(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/)) {
        return res.status(400).send("Imagem deve ser uma URL válida");
    }

    // The image not be empty
    if (image === "") {
        return res.status(400).send("Imagem não pode ser vazia");
    }

    // The description has to be a string
    if (typeof description !== "string") {
        return res.status(400).send("Descrição deve ser uma string");
    }

    next();
}