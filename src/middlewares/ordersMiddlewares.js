import connection from "../database/db.js";

export async function postOrdersMiddlewares(req, res, next) {

   // Check if exists a client with the id
    const { clientId } = req.body;
    const client = await connection.query(`SELECT * FROM clients WHERE id = ${clientId}`);

    // If there is no client with the id, return status 404
    if (client.rowCount === 0) {
        return res.sendStatus(404).send("Cliente não encontrado");
    }

    // Check if exists a cake with the id
    const { cakeId } = req.body;
    const cake = await connection.query(`SELECT * FROM cakes WHERE id = ${cakeId}`);

    // If there is no cake with the id, return status 404
    if (cake.rowCount === 0) {
        return res.sendStatus(404).send("Bolo não encontrado");
    }

    // If the quantity isn't a number or is less than 0 or is greater than 5, return status 400
    const { quantity } = req.body;
    if ( isNaN(quantity) || quantity <= 0 || quantity > 5 ) {
        return res.sendStatus(400).send("Quantidade tem que ser um número entre 1 e 5");
    }

    next();
}