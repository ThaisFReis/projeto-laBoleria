import connection from "../database/db.js";
import joi from 'joi';

export async function cakesMiddlewares(req, res, next) {
    const { name, price, image, description } = req.body;
    
    // Schema to validate the request body
    const schema = joi.object({
        name: joi.string().min(2).required(),
        price: joi.number().required(),
        image: joi.string().regex(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/).required(),
        description: joi.string().allow(null)
    });

    // Validation
    const validation = schema.validate(req.body);

    if (validation.error) {
        return res.status(400).send(validation.error.details[0].message);
    }

    // The name must be unique 
    const nameExists = await connection.query(`SELECT * FROM cakes WHERE name = $1`, [name]);
    if (nameExists.rowCount) {
        return res.status(409).send("Nome já existe");
    }

    // The name not be empty must be greater than 2 characters
    if (name === "" || name.length < 2) {
        return res.status(400).send("Nome deve ter mais de 2 caracteres");
    }

    // The price must be greater than 0 and not be empty
    if (price < 0 || price === "") {
        return res.status(400).send("Preço deve ser um número maior que 0");
    }

    // The image must be a valid URL and not be empty
    if (!image.match(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/) || image === "") {
        return res.status(400).send("Imagem deve ser uma URL válida");
    }

    // The description must be a string
    if (typeof description !== "string") {
        return res.status(400).send("Descrição deve ser uma string");
    }

    next();
}